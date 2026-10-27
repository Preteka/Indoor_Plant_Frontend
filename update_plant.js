const fs = require('fs');

let content = fs.readFileSync('about.html', 'utf8');

// ── Replace dormant sprout ──────────────────────────────────────────────────
const oldSprout = `                <!-- DORMANT SEEDLING SPROUT (Stage 0: Young sprout before full growth) -->
                <g class="dormant-sprout-svg" transform="translate(170, 324)">
                  <path d="M0,0 Q-4,-14 -12,-18 Q-3,-22 2,-13 Q6,-22 15,-17 Q7,-11 0,0" fill="#34D399" opacity="0.9" />
                  <circle cx="0" cy="-15" r="2.5" fill="#A7F3D0" opacity="0.75" />
                </g>`;

const newSprout = `                <!-- DORMANT SEEDLING SPROUT (Stage 0: Young sprout before full growth) -->
                <g class="dormant-sprout-svg" transform="translate(170, 325)">
                  <path d="M0,0 Q-2,-12 0,-24" stroke="#2D5444" stroke-width="2.5" stroke-linecap="round" fill="none" />
                  <path d="M-1,-12 C-8,-14 -16,-22 -12,-30 C-4,-28 2,-18 -1,-12 Z" fill="url(#leafGradVibrant)" />
                  <path d="M0,-22 C6,-24 14,-32 10,-40 C3,-38 -3,-28 0,-22 Z" fill="url(#leafGradFresh)" />
                </g>`;

content = content.replace(oldSprout, newSprout);

// ── Replace the trunk path ──────────────────────────────────────────────────
const oldTrunk = `                  <!-- MAIN TRUNK (Organic curve, thick base tapering upward) -->
                  <path class="tree-trunk-path"
                    d="M170,325 C167,285 164,245 171,200 C176,155 168,110 170,68"
                    stroke="url(#trunkGrad)"
                    stroke-width="7"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- PRIMARY & SECONDARY BRANCHES (Asymmetrical, natural branching) -->
                  
                  <!-- Branch L1 (Lower Left) -->
                  <path class="tree-branch-path branch-l1"
                    d="M168,275 C146,268 120,258 92,236"
                    stroke="url(#branchGrad)"
                    stroke-width="4.2"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem L1a -->
                  <path class="tree-branch-path branch-sub-l1a"
                    d="M118,252 C98,248 84,242 72,234"
                    stroke="url(#branchGrad)"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem L1b -->
                  <path class="tree-branch-path branch-sub-l1b"
                    d="M140,264 C132,274 122,284 114,290"
                    stroke="url(#branchGrad)"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Branch R1 (Lower Right) -->
                  <path class="tree-branch-path branch-r1"
                    d="M169,255 C196,248 226,238 252,216"
                    stroke="url(#branchGrad)"
                    stroke-width="4.2"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem R1a -->
                  <path class="tree-branch-path branch-sub-r1a"
                    d="M222,234 C244,228 258,222 270,214"
                    stroke="url(#branchGrad)"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem R1b -->
                  <path class="tree-branch-path branch-sub-r1b"
                    d="M200,246 C210,256 220,266 230,272"
                    stroke="url(#branchGrad)"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Branch L2 (Mid Left) -->
                  <path class="tree-branch-path branch-l2"
                    d="M170,202 C142,192 110,180 82,152"
                    stroke="url(#branchGrad)"
                    stroke-width="3.8"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem L2a -->
                  <path class="tree-branch-path branch-sub-l2a"
                    d="M110,172 C88,162 72,154 58,142"
                    stroke="url(#branchGrad)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem L2b -->
                  <path class="tree-branch-path branch-sub-l2b"
                    d="M136,186 C124,170 114,154 106,140"
                    stroke="url(#branchGrad)"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Branch R2 (Mid Right) -->
                  <path class="tree-branch-path branch-r2"
                    d="M171,180 C202,170 234,158 262,132"
                    stroke="url(#branchGrad)"
                    stroke-width="3.8"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem R2a -->
                  <path class="tree-branch-path branch-sub-r2a"
                    d="M230,150 C252,140 268,132 284,120"
                    stroke="url(#branchGrad)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem R2b -->
                  <path class="tree-branch-path branch-sub-r2b"
                    d="M206,164 C218,148 228,132 236,118"
                    stroke="url(#branchGrad)"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Branch L3 (Upper Left) -->
                  <path class="tree-branch-path branch-l3"
                    d="M169,132 C148,120 126,104 106,82"
                    stroke="url(#branchGrad)"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem L3a -->
                  <path class="tree-branch-path branch-sub-l3a"
                    d="M132,104 C116,92 102,80 88,68"
                    stroke="url(#branchGrad)"
                    stroke-width="2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Branch R3 (Upper Right) -->
                  <path class="tree-branch-path branch-r3"
                    d="M170,116 C192,104 216,88 238,68"
                    stroke="url(#branchGrad)"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <!-- Sub-stem R3a -->
                  <path class="tree-branch-path branch-sub-r3a"
                    d="M208,88 C224,76 238,64 252,52"
                    stroke="url(#branchGrad)"
                    stroke-width="2"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Apex Lead Stem (Top Crown) -->
                  <path class="tree-branch-path branch-apex"
                    d="M170,72 C169,54 170,40 170,28"
                    stroke="url(#branchGrad)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    fill="none"
                  />`;

const newTrunk = `                  <!-- Central Main Stem (Organic, thin botanical indoor plant style) -->
                  <path class="tree-trunk-path"
                    d="M170,325 C168,275 172,215 168,155 C166,115 170,80 170,52"
                    stroke="url(#trunkGrad)"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- STEMS — Every stem ends at a leaf -->

                  <!-- Branch 1 (Lower Left petiole → Leaf 1) -->
                  <path class="tree-branch-path branch-1"
                    d="M169,285 C152,282 136,278 122,270"
                    stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" fill="none" />

                  <!-- Branch 2 (Lower Right petiole → Leaf 2) -->
                  <path class="tree-branch-path branch-2"
                    d="M170,272 C186,268 202,263 216,255"
                    stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" fill="none" />

                  <!-- Branch 3 (Mid-Lower Left → Leaf 3) -->
                  <path class="tree-branch-path branch-3"
                    d="M168,242 C146,236 122,228 100,220"
                    stroke="url(#branchGrad)" stroke-width="2.6" stroke-linecap="round" fill="none" />

                  <!-- Branch 4 (Mid-Lower Right → Leaf 4) -->
                  <path class="tree-branch-path branch-4"
                    d="M171,232 C194,226 218,218 242,210"
                    stroke="url(#branchGrad)" stroke-width="2.6" stroke-linecap="round" fill="none" />

                  <!-- Branch 5 (Mid Left vertical sub → Leaf 5) -->
                  <path class="tree-branch-path branch-5"
                    d="M125,230 C126,215 127,200 128,185"
                    stroke="url(#branchGrad)" stroke-width="2.2" stroke-linecap="round" fill="none" />

                  <!-- Branch 6 (Mid Right vertical sub → Leaf 6) -->
                  <path class="tree-branch-path branch-6"
                    d="M215,222 C216,206 218,190 220,175"
                    stroke="url(#branchGrad)" stroke-width="2.2" stroke-linecap="round" fill="none" />

                  <!-- Branch 7 (Mid-Upper Left → Leaf 7) -->
                  <path class="tree-branch-path branch-7"
                    d="M170,182 C150,170 132,156 115,140"
                    stroke="url(#branchGrad)" stroke-width="2.4" stroke-linecap="round" fill="none" />

                  <!-- Branch 8 (Mid-Upper Right → Leaf 8) -->
                  <path class="tree-branch-path branch-8"
                    d="M169,168 C188,156 208,144 228,130"
                    stroke="url(#branchGrad)" stroke-width="2.4" stroke-linecap="round" fill="none" />

                  <!-- Branch 9 (Upper Left → Leaf 9) -->
                  <path class="tree-branch-path branch-9"
                    d="M169,128 C158,114 148,100 138,85"
                    stroke="url(#branchGrad)" stroke-width="2.2" stroke-linecap="round" fill="none" />

                  <!-- Branch 10 (Upper Right → Leaf 10) -->
                  <path class="tree-branch-path branch-10"
                    d="M170,118 C182,105 193,92 204,78"
                    stroke="url(#branchGrad)" stroke-width="2.2" stroke-linecap="round" fill="none" />`;

content = content.replace(oldTrunk, newTrunk);

// ── Replace leaves section ──────────────────────────────────────────────────
// Find the leaf section start and end markers
const leafStart = '                  <!-- ==================== REAL BOTANICAL LEAF SILHOUETTES (19 Leaves) ====================';
const leafEnd = `                  <!-- Leaf 19: Crown Apex Center Lead Leaf -->
                  <g class="tree-leaf-group leaf-19" transform="translate(170, 26)">
                    <path class="tree-leaf-body" d="M0,0 C-6,-8 -4,-26 0,-30 C4,-26 6,-8 0,0 Z" fill="url(#leafGradFresh)" />
                    <path class="tree-leaf-vein" d="M0,0 L0,-28" stroke="#FFFFFF" stroke-width="0.8" opacity="0.75" />
                  </g>`;

const newLeaves = `                  <!-- ==================== REAL BOTANICAL INDOOR PLANT LEAF BLADES (11 Leaves) ==================== -->

                  <!-- Leaf 1: Lower Left Broad (at branch-1 end 122,270) -->
                  <g class="tree-leaf-group leaf-1" transform="translate(122, 270)">
                    <path class="tree-leaf-body" d="M0,0 C-18,-6 -34,-26 -24,-48 C-6,-44 10,-22 0,0 Z" fill="url(#leafGradMature)" />
                    <path class="tree-leaf-vein" d="M0,0 C-8,-16 -16,-34 -19,-45" stroke="#6EE7B7" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
                    <path class="tree-leaf-vein" d="M-6,-14 Q-14,-15 -18,-20" stroke="#6EE7B7" stroke-width="0.75" opacity="0.5" />
                    <path class="tree-leaf-vein" d="M-12,-28 Q-19,-30 -21,-35" stroke="#6EE7B7" stroke-width="0.75" opacity="0.5" />
                  </g>

                  <!-- Leaf 2: Lower Right Arching (at branch-2 end 216,255) -->
                  <g class="tree-leaf-group leaf-2" transform="translate(216, 255)">
                    <path class="tree-leaf-body" d="M0,0 C16,-6 32,-24 22,-46 C6,-42 -8,-20 0,0 Z" fill="url(#leafGradMature)" />
                    <path class="tree-leaf-vein" d="M0,0 C8,-15 15,-32 18,-43" stroke="#6EE7B7" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
                    <path class="tree-leaf-vein" d="M6,-13 Q14,-14 18,-18" stroke="#6EE7B7" stroke-width="0.75" opacity="0.5" />
                    <path class="tree-leaf-vein" d="M11,-26 Q18,-28 20,-33" stroke="#6EE7B7" stroke-width="0.75" opacity="0.5" />
                  </g>

                  <!-- Leaf 3: Mid-Lower Left Large (at branch-3 end 100,220) -->
                  <g class="tree-leaf-group leaf-3" transform="translate(100, 220)">
                    <path class="tree-leaf-body" d="M0,0 C-22,-8 -40,-32 -28,-58 C-8,-54 14,-28 0,0 Z" fill="url(#leafGradVibrant)" />
                    <path class="tree-leaf-vein" d="M0,0 C-10,-20 -20,-42 -23,-54" stroke="#A7F3D0" stroke-width="1.3" stroke-linecap="round" opacity="0.7" />
                    <path class="tree-leaf-vein" d="M-8,-16 Q-18,-18 -24,-24" stroke="#A7F3D0" stroke-width="0.8" opacity="0.5" />
                    <path class="tree-leaf-vein" d="M-15,-32 Q-24,-34 -26,-40" stroke="#A7F3D0" stroke-width="0.8" opacity="0.5" />
                  </g>

                  <!-- Leaf 4: Mid-Lower Right Large (at branch-4 end 242,210) -->
                  <g class="tree-leaf-group leaf-4" transform="translate(242, 210)">
                    <path class="tree-leaf-body" d="M0,0 C22,-8 40,-32 28,-58 C8,-54 -14,-28 0,0 Z" fill="url(#leafGradVibrant)" />
                    <path class="tree-leaf-vein" d="M0,0 C10,-20 20,-42 23,-54" stroke="#A7F3D0" stroke-width="1.3" stroke-linecap="round" opacity="0.7" />
                    <path class="tree-leaf-vein" d="M8,-16 Q18,-18 24,-24" stroke="#A7F3D0" stroke-width="0.8" opacity="0.5" />
                    <path class="tree-leaf-vein" d="M15,-32 Q24,-34 26,-40" stroke="#A7F3D0" stroke-width="0.8" opacity="0.5" />
                  </g>

                  <!-- Leaf 5: Mid Left Vertical (at branch-5 end 128,185) -->
                  <g class="tree-leaf-group leaf-5" transform="translate(128, 185)">
                    <path class="tree-leaf-body" d="M0,0 C-14,-4 -24,-24 -12,-44 C2,-40 12,-18 0,0 Z" fill="url(#leafGradMature)" />
                    <path class="tree-leaf-vein" d="M0,0 C-4,-15 -8,-32 -10,-41" stroke="#6EE7B7" stroke-width="1.1" stroke-linecap="round" opacity="0.6" />
                  </g>

                  <!-- Leaf 6: Mid Right Vertical (at branch-6 end 220,175) -->
                  <g class="tree-leaf-group leaf-6" transform="translate(220, 175)">
                    <path class="tree-leaf-body" d="M0,0 C14,-4 24,-24 12,-44 C-2,-40 -12,-18 0,0 Z" fill="url(#leafGradMature)" />
                    <path class="tree-leaf-vein" d="M0,0 C4,-15 8,-32 10,-41" stroke="#6EE7B7" stroke-width="1.1" stroke-linecap="round" opacity="0.6" />
                  </g>

                  <!-- Leaf 7: Mid-Upper Left (at branch-7 end 115,140) -->
                  <g class="tree-leaf-group leaf-7" transform="translate(115, 140)">
                    <path class="tree-leaf-body" d="M0,0 C-18,-6 -30,-28 -18,-50 C-2,-46 12,-22 0,0 Z" fill="url(#leafGradVibrant)" />
                    <path class="tree-leaf-vein" d="M0,0 C-6,-18 -12,-38 -15,-47" stroke="#A7F3D0" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
                  </g>

                  <!-- Leaf 8: Mid-Upper Right (at branch-8 end 228,130) -->
                  <g class="tree-leaf-group leaf-8" transform="translate(228, 130)">
                    <path class="tree-leaf-body" d="M0,0 C18,-6 30,-28 18,-50 C2,-46 -12,-22 0,0 Z" fill="url(#leafGradVibrant)" />
                    <path class="tree-leaf-vein" d="M0,0 C6,-18 12,-38 15,-47" stroke="#A7F3D0" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
                  </g>

                  <!-- Leaf 9: Upper Left Fresh (at branch-9 end 138,85) -->
                  <g class="tree-leaf-group leaf-9" transform="translate(138, 85)">
                    <path class="tree-leaf-body" d="M0,0 C-12,-4 -20,-22 -10,-38 C2,-34 10,-16 0,0 Z" fill="url(#leafGradFresh)" />
                    <path class="tree-leaf-vein" d="M0,0 C-3,-12 -6,-26 -8,-35" stroke="#FFFFFF" stroke-width="0.9" opacity="0.75" />
                  </g>

                  <!-- Leaf 10: Upper Right Fresh (at branch-10 end 204,78) -->
                  <g class="tree-leaf-group leaf-10" transform="translate(204, 78)">
                    <path class="tree-leaf-body" d="M0,0 C12,-4 20,-22 10,-38 C-2,-34 -10,-16 0,0 Z" fill="url(#leafGradFresh)" />
                    <path class="tree-leaf-vein" d="M0,0 C3,-12 6,-26 8,-35" stroke="#FFFFFF" stroke-width="0.9" opacity="0.75" />
                  </g>

                  <!-- Leaf 11: Crown Apex Lead (at stem top 170,52) -->
                  <g class="tree-leaf-group leaf-11" transform="translate(170, 52)">
                    <path class="tree-leaf-body" d="M0,0 C-8,-8 -6,-30 0,-36 C6,-30 8,-8 0,0 Z" fill="url(#leafGradFresh)" />
                    <path class="tree-leaf-vein" d="M0,0 L0,-32" stroke="#FFFFFF" stroke-width="1" opacity="0.85" />
                  </g>`;

const oldLeafBlock = content.substring(
  content.indexOf(leafStart),
  content.indexOf(leafEnd) + leafEnd.length
);

if (oldLeafBlock && content.includes(leafStart) && content.includes(leafEnd)) {
  content = content.replace(oldLeafBlock, newLeaves);
  console.log('Leaf section replaced successfully.');
} else {
  console.log('WARNING: leaf block markers not found!');
}

fs.writeFileSync('about.html', content, 'utf8');
console.log('about.html updated.');
