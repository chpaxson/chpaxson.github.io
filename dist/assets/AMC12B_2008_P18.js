var e=`<!-- metadata -->\r
2008 AMC12B\r
Problem 18\r
answer = 5\r
\r
\r
# Problem\r
A drunkard begins at a vertex of a cube and at each step moves to one of the 3 adjacent vertices with equal probability.  After 4 steps, what is the probability the drunkard is back at the starting vertex?\r
\r
answers = $\\frac{1}{27}$, $\\frac{2}{27}$, $\\frac{1}{4}$, $\\frac{4}{27}$, $\\frac{7}{27}$\r
\r
\r
# Solution\r
\r
By symmetry, every vertex can be classified by its **graph distance** from the start:\r
\r
| Type | Vertices | Transitions |\r
|------|----------|-------------|\r
| **0** — Start | 1 | → type 1 (prob 1) |\r
| **1** — Adjacent | 3 | → type 0 (prob 1/3), type 2 (prob 2/3) |\r
| **2** — Face-diagonal | 3 | → type 1 (prob 2/3), type 3 (prob 1/3) |\r
| **3** — Antipodal | 1 | → type 2 (prob 1) |\r
\r
Let $p_n, q_n, r_n, s_n$ be the probability of being at a **specific** vertex of type 0, 1, 2, 3 respectively after $n$ steps. The recurrences are:\r
\r
$$p_{n+1} = q_n, \\qquad q_{n+1} = \\tfrac{p_n}{3} + \\tfrac{2r_n}{3}, \\qquad r_{n+1} = \\tfrac{2q_n}{3} + \\tfrac{s_n}{3}, \\qquad s_{n+1} = r_n$$\r
\r
Starting from $p_0 = 1$, all others $0$:\r
\r
| Step | $p_n$ | $q_n$ (×3) | $r_n$ (×3) | $s_n$ |\r
|------|--------|------------|------------|-------|\r
| 0 | $1$ | $0$ | $0$ | $0$ |\r
| 1 | $0$ | $\\frac{1}{3}$ | $0$ | $0$ |\r
| 2 | $\\frac{1}{3}$ | $0$ | $\\frac{2}{9}$ | $0$ |\r
| 3 | $0$ | $\\frac{7}{27}$ | $0$ | $\\frac{2}{9}$ |\r
| 4 | $\\frac{7}{27}$ | $0$ | $\\frac{20}{81}$ | $0$ |\r
\r
The probability of being back at the start after 4 steps is $p_4 = \\boxed{\\dfrac{7}{27}}$.\r
\r
The answer is $\\textbf{(E)}$.\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style>\r
*{box-sizing:border-box;margin:0;padding:0}\r
body{background:#0d0d1a;overflow:hidden;font-family:system-ui,sans-serif}\r
canvas{display:block}\r
#controls{\r
  position:absolute;bottom:16px;left:50%;transform:translateX(-50%);\r
  background:rgba(10,10,30,.92);border:1px solid rgba(120,140,255,.3);\r
  border-radius:12px;padding:10px 24px;display:flex;align-items:center;gap:18px\r
}\r
button{\r
  background:rgba(74,158,255,.18);border:1px solid rgba(74,158,255,.4);\r
  color:#aac;border-radius:8px;padding:6px 18px;cursor:pointer;font-size:13px;\r
  transition:background .15s\r
}\r
button:hover{background:rgba(74,158,255,.35)}\r
button:disabled{opacity:.3;cursor:default}\r
#stepLabel{color:#ccd;font-size:13px;min-width:60px;text-align:center}\r
#legend{\r
  position:absolute;top:12px;left:12px;\r
  background:rgba(10,10,30,.85);border:1px solid rgba(120,140,255,.2);\r
  border-radius:10px;padding:10px 14px;font-size:11px;line-height:2;color:#99a\r
}\r
.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:middle}\r
#info{position:absolute;top:12px;right:12px;\r
  background:rgba(10,10,30,.85);border:1px solid rgba(120,140,255,.2);\r
  border-radius:10px;padding:10px 14px;font-size:11px;line-height:2;color:#aac;min-width:180px}\r
</style></head><body>\r
<div id="legend">\r
  <div><span class="dot" style="background:#22cc66"></span>Type 0 — Start</div>\r
  <div><span class="dot" style="background:#4a9eff"></span>Type 1 — Adjacent (3)</div>\r
  <div><span class="dot" style="background:#ffaa33"></span>Type 2 — Face-diagonal (3)</div>\r
  <div><span class="dot" style="background:#ff4466"></span>Type 3 — Antipodal</div>\r
</div>\r
<div id="info">Probabilities after step 0</div>\r
<div id="controls">\r
  <button id="btnPrev" disabled>‹ Prev</button>\r
  <span id="stepLabel">Step 0</span>\r
  <button id="btnNext">Next ›</button>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// Probabilities at each step: [p, q, q, q, r, r, r, s]\r
// Vertex index order matches VERTS below\r
const STEP_PROBS = [\r
  [1, 0, 0, 0, 0, 0, 0, 0],                                            // step 0\r
  [0, 1/3, 1/3, 1/3, 0, 0, 0, 0],                                      // step 1\r
  [1/3, 0, 0, 0, 2/9, 2/9, 2/9, 0],                                    // step 2\r
  [0, 7/27, 7/27, 7/27, 0, 0, 0, 2/9],                                 // step 3\r
  [7/27, 0, 0, 0, 20/81, 20/81, 20/81, 0],                             // step 4\r
];\r
\r
const FRACS = [\r
  ['1','0','0','0','0','0','0','0'],\r
  ['0','⅓','⅓','⅓','0','0','0','0'],\r
  ['⅓','0','0','0','2/9','2/9','2/9','0'],\r
  ['0','7/27','7/27','7/27','0','0','0','2/9'],\r
  ['7/27','0','0','0','20/81','20/81','20/81','0'],\r
];\r
\r
// Cube vertices: (0,0,0)=type0, (1,0,0)(0,1,0)(0,0,1)=type1,\r
//               (1,1,0)(1,0,1)(0,1,1)=type2, (1,1,1)=type3\r
const VERTS = [\r
  [0,0,0],[1,0,0],[0,1,0],[0,0,1],\r
  [1,1,0],[1,0,1],[0,1,1],[1,1,1]\r
];\r
const COLORS = [0x22cc66, 0x4a9eff, 0x4a9eff, 0x4a9eff, 0xffaa33, 0xffaa33, 0xffaa33, 0xff4466];\r
\r
// Cube edges (pairs of vertex indices differing in exactly 1 bit)\r
const EDGES = [];\r
for (let i=0;i<8;i++) for (let j=i+1;j<8;j++) {\r
  const [ax,ay,az]=VERTS[i],[bx,by,bz]=VERTS[j];\r
  if (Math.abs(ax-bx)+Math.abs(ay-by)+Math.abs(az-bz)===1) EDGES.push([i,j]);\r
}\r
\r
// Scene\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 100);\r
camera.position.set(2.5, 2.2, 2.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping=true; orbit.dampingFactor=0.07;\r
orbit.target.set(0.5,0.5,0.5); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.7));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(4,6,5); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.35);\r
fill.position.set(-3,1,-3); scene.add(fill);\r
\r
// Edges\r
const edgePts = [];\r
EDGES.forEach(([i,j]) => {\r
  edgePts.push(...VERTS[i], ...VERTS[j]);\r
});\r
const edgeGeo = new THREE.BufferGeometry();\r
edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts.flat(), 3));\r
scene.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0x2a3560, linewidth: 1.5 })));\r
\r
// Vertex spheres\r
const MAX_R = 0.22, MIN_R = 0.04;\r
const sphereMeshes = VERTS.map((v, i) => {\r
  const geo = new THREE.SphereGeometry(MIN_R, 24, 16);\r
  const mat = new THREE.MeshStandardMaterial({ color: COLORS[i], roughness: 0.35, metalness: 0.1 });\r
  const mesh = new THREE.Mesh(geo, mat);\r
  mesh.position.set(...v);\r
  scene.add(mesh);\r
  return mesh;\r
});\r
\r
let step = 0;\r
function render(s) {\r
  step = s;\r
  const probs = STEP_PROBS[s];\r
  const fracs = FRACS[s];\r
  const maxP = Math.max(...probs);\r
\r
  sphereMeshes.forEach((m, i) => {\r
    const p = probs[i];\r
    const r = p === 0 ? MIN_R : MIN_R + (MAX_R - MIN_R) * (p / (maxP || 1));\r
    m.geometry.dispose();\r
    m.geometry = new THREE.SphereGeometry(r, 24, 16);\r
    m.material.opacity = p === 0 ? 0.25 : 1;\r
    m.material.transparent = p === 0;\r
  });\r
\r
  document.getElementById('stepLabel').textContent = \`Step \${s}\`;\r
  document.getElementById('btnPrev').disabled = s === 0;\r
  document.getElementById('btnNext').disabled = s === 4;\r
\r
  // Info panel\r
  const typeProbs = [\r
    \`Start: <b>\${fracs[0]}</b>\`,\r
    \`Type 1 (each): <b>\${fracs[1]}</b>\`,\r
    \`Type 2 (each): <b>\${fracs[4]}</b>\`,\r
    \`Antipodal: <b>\${fracs[7]}</b>\`,\r
  ];\r
  document.getElementById('info').innerHTML =\r
    \`<b>After step \${s}:</b><br>\` + typeProbs.join('<br>') +\r
    (s===4 ? '<br><span style="color:#7cf">← P(return) = 7/27</span>' : '');\r
}\r
\r
document.getElementById('btnPrev').addEventListener('click', () => render(step - 1));\r
document.getElementById('btnNext').addEventListener('click', () => render(step + 1));\r
render(0);\r
\r
function animate() { requestAnimationFrame(animate); orbit.update(); renderer.render(scene, camera); }\r
animate();\r
window.addEventListener('resize', () => {\r
  camera.aspect = innerWidth/innerHeight;\r
  camera.updateProjectionMatrix();\r
  renderer.setSize(innerWidth, innerHeight);\r
});\r
window.parent.postMessage({ iframeHeight: 500 }, '*');\r
<\/script></body></html>\r
\`\`\`\r
\r
\r
`;export{e as default};