const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1024,768',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getJson(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }

  const list = await getJson('http://127.0.0.1:9222/json');
  const page = list.find(p => p.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  ws.onmessage = msg => {
    const data = JSON.parse(msg.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.onopen = r);

  // Set device metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://127.0.0.1:8085/index.html' });
  await new Promise(r => setTimeout(r, 2000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      const grid = footer ? footer.querySelector('.site-container > div.grid') : null;
      if (!grid) return { error: 'Grid not found' };

      const gridRect = grid.getBoundingClientRect();
      const gridStyle = window.getComputedStyle(grid);
      const cols = Array.from(grid.children).map((col, idx) => {
        const rect = col.getBoundingClientRect();
        const style = window.getComputedStyle(col);
        return {
          index: idx,
          tag: col.tagName,
          className: col.className,
          width: rect.width,
          height: rect.height,
          clientWidth: col.clientWidth,
          scrollWidth: col.scrollWidth,
          overflowing: col.scrollWidth > col.clientWidth
        };
      });

      // Check contact column links
      const contactCol = grid.children[3];
      const emailLink = contactCol ? contactCol.querySelector('a[href^="mailto:"]') : null;
      let emailInfo = null;
      if (emailLink) {
        const er = emailLink.getBoundingClientRect();
        emailInfo = {
          text: emailLink.textContent,
          width: er.width,
          scrollWidth: emailLink.scrollWidth,
          clientWidth: emailLink.clientWidth,
          overflow: emailLink.scrollWidth > emailLink.clientWidth,
          parentWidth: emailLink.parentElement.getBoundingClientRect().width,
          colWidth: contactCol.getBoundingClientRect().width
        };
      }

      // Check services column links wrapping
      const servicesCol = grid.children[2];
      const serviceLinks = servicesCol ? Array.from(servicesCol.querySelectorAll('li a')).map(a => {
        const r = a.getBoundingClientRect();
        const lineHeight = parseFloat(window.getComputedStyle(a).lineHeight) || 20;
        return {
          text: a.textContent.trim(),
          height: r.height,
          lines: Math.round(r.height / lineHeight)
        };
      }) : [];

      return {
        gridCols: gridStyle.gridTemplateColumns,
        gridGap: gridStyle.gap,
        gridWidth: gridRect.width,
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        cols,
        emailInfo,
        serviceLinks
      };
    })()`,
    returnByValue: true
  });

  console.log('--- 1024px Metrics ---');
  console.log(JSON.stringify(evalRes.result.value, null, 2));

  // Take screenshot of footer
  const clipRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const f = document.querySelector('footer');
      const r = f.getBoundingClientRect();
      return { x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height };
    })()`,
    returnByValue: true
  });
  const clip = clipRes.result.value;

  // Scroll to footer
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, document.body.scrollHeight);` });
  await new Promise(r => setTimeout(r, 1000));

  const metricsRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      if (!footer) return 'NO_FOOTER';
      const grid = footer.querySelector('.site-container > div.grid');
      if (!grid) return 'NO_GRID';
      
      const gridRect = grid.getBoundingClientRect();
      const cols = Array.from(grid.children).map((c, i) => {
        const r = c.getBoundingClientRect();
        return {
          idx: i,
          width: Math.round(r.width),
          scrollWidth: c.scrollWidth,
          text: c.innerText.slice(0, 50).replace(/\\n/g, ' ')
        };
      });

      const contactLinks = Array.from(grid.children[3]?.querySelectorAll('li') || []).map(li => {
        const a = li.querySelector('a, span');
        return {
          text: a ? a.innerText.trim() : '',
          width: a ? Math.round(a.getBoundingClientRect().width) : 0,
          scrollWidth: a ? a.scrollWidth : 0,
          parentWidth: Math.round(li.getBoundingClientRect().width)
        };
      });

      const serviceLinks = Array.from(grid.children[2]?.querySelectorAll('li a') || []).map(a => {
        return {
          text: a.innerText.trim(),
          width: Math.round(a.getBoundingClientRect().width),
          height: Math.round(a.getBoundingClientRect().height)
        };
      });

      return {
        gridCols: window.getComputedStyle(grid).gridTemplateColumns,
        gap: window.getComputedStyle(grid).gap,
        gridWidth: Math.round(gridRect.width),
        cols,
        contactLinks,
        serviceLinks
      };
    })()`,
    returnByValue: true
  });

  console.log('--- Footer Metrics at 1024px ---');
  console.log(JSON.stringify(metricsRes.result.value, null, 2));

  const ss = await send('Page.captureScreenshot', {
    format: 'png'
  });

  fs.writeFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\22221fc4-5e67-4fd4-9d37-32b3da9284ea\\footer_1024_viewport.png', Buffer.from(ss.result.data, 'base64'));
  console.log('Screenshot saved to brain\\footer_1024_viewport.png');

  ws.close();
  edge.kill();
}

run().catch(console.error);
