var e=`<!-- metadata -->\r
2005 AMC12A\r
Problem 22\r
answer = 2\r
\r
\r
# Problem\r
A rectangular box $P$ is inscribed in a sphere of radius $r$. The surface area of $P$ is $384$, and the sum of the lengths of its 12 edges is $112$. What is $r$?\r
\r
answers = $8$, $10$, $12$, $14$, $16$\r
\r
\r
\r
# Solution\r
Let the box have dimensions $a$, $b$, $c$. From the given conditions:\r
\r
$$2(ab + bc + ca) = 384 \\implies ab + bc + ca = 192$$\r
\r
$$4(a + b + c) = 112 \\implies a + b + c = 28$$\r
\r
Since the box is inscribed in the sphere, its space diagonal equals the diameter $2r$:\r
\r
$$a^2 + b^2 + c^2 = (2r)^2$$\r
\r
Using the identity $(a+b+c)^2 = a^2+b^2+c^2 + 2(ab+bc+ca)$:\r
\r
$$28^2 = a^2+b^2+c^2 + 2(192) \\implies a^2+b^2+c^2 = 784 - 384 = 400$$\r
\r
Therefore $(2r)^2 = 400 \\implies r = \\boxed{10}$.\r
\r
The diagram below shows the box inscribed in the sphere. Use the slider to change $a$ — the values of $b$ and $c$ are computed from the two constraints, and the sphere radius $r$ stays exactly $10$ no matter what $a$ is!\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html>\r
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>\r
* { box-sizing: border-box; margin: 0; padding: 0; }\r
body { font-family: system-ui, sans-serif; background: #0f1117; color: #e2e8f0; padding: 14px; }\r
h3 { font-size: 0.8rem; font-weight: 600; text-align: center; margin-bottom: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }\r
#cw { width: 100%; border-radius: 8px; overflow: hidden; background: #070a10; }\r
canvas { display: block; width: 100% !important; }\r
.sr { display: flex; align-items: center; gap: 10px; margin: 11px 0 9px; }\r
.sr label { font-size: 0.88rem; color: #94a3b8; white-space: nowrap; min-width: 80px; }\r
.sr input { flex: 1; accent-color: #60a5fa; cursor: pointer; }\r
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }\r
.stat { background: #1a1d2e; border-radius: 7px; padding: 8px 4px; text-align: center; }\r
.stat .v { font-size: 1.05rem; font-weight: 700; font-variant-numeric: tabular-nums; }\r
.stat .v.a  { color: #60a5fa; }\r
.stat .v.b  { color: #c084fc; }\r
.stat .v.c  { color: #fbbf24; }\r
.stat .v.r  { color: #4ade80; }\r
.stat .v.sa { color: #fb923c; }\r
.stat .v.el { color: #fb923c; }\r
.stat .lbl { font-size: 0.68rem; color: #475569; margin-top: 2px; }\r
.foot { margin-top: 9px; text-align: center; font-size: 0.78rem; padding: 6px 10px; border-radius: 5px; background: rgba(74,222,128,0.07); color: #4ade80; }\r
.foot.err { background: rgba(248,113,113,0.07); color: #f87171; }\r
</style></head><body>\r
<h3>Box Inscribed in Sphere &mdash; Drag to Orbit &middot; Scroll to Zoom</h3>\r
<div id="cw"><canvas id="c"></canvas></div>\r
<div class="sr">\r
  <label>a = <b id="av">8.00</b></label>\r
  <input type="range" id="sl" min="0.1" max="11.9" step="0.01" value="4.5">\r
</div>\r
<div class="stats">\r
  <div class="stat"><div class="v a" id="va">-</div><div class="lbl">a</div></div>\r
  <div class="stat"><div class="v b" id="vb">-</div><div class="lbl">b</div></div>\r
  <div class="stat"><div class="v c" id="vc">-</div><div class="lbl">c</div></div>\r
  <div class="stat"><div class="v r" id="vr">-</div><div class="lbl">r</div></div>\r
  <div class="stat"><div class="v sa" id="vsa">-</div><div class="lbl">surface area (= 384)</div></div>\r
  <div class="stat"><div class="v el" id="vel">-</div><div class="lbl">edge sum (= 112)</div></div>\r
</div>\r
<div class="foot" id="foot">Move the slider to explore different box shapes</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const canvas = document.getElementById('c');\r
const cw = document.getElementById('cw');\r
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });\r
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\r
renderer.setClearColor(0x070a10, 1);\r
\r
const scene = new THREE.Scene();\r
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);\r
camera.position.set(30, 18, 30);\r
\r
const controls = new OrbitControls(camera, canvas);\r
controls.enableDamping = true;\r
controls.dampingFactor = 0.08;\r
controls.enablePan = false;\r
controls.minDistance = 18;\r
controls.maxDistance = 65;\r
\r
scene.add(new THREE.AmbientLight(0xffffff, 0.55));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.95);\r
dl.position.set(25, 35, 20);\r
scene.add(dl);\r
\r
// Semi-transparent box face fill\r
const boxGeo = new THREE.BoxGeometry(1, 1, 1);\r
const boxMat = new THREE.MeshPhongMaterial({ color: 0x334155, transparent: true, opacity: 0.18, depthWrite: false });\r
const boxMesh = new THREE.Mesh(boxGeo, boxMat);\r
scene.add(boxMesh);\r
\r
// Helper: build a LineSegments from an array of [x1,y1,z1, x2,y2,z2, ...] pairs\r
function makeEdges(coords, color) {\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(coords), 3));\r
  const lines = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color, linewidth: 2 }));\r
  scene.add(lines);\r
  return lines;\r
}\r
\r
// Unit-box edges split by axis direction.\r
// After scale(a,b,c): X-edges have physical length a, Y→b, Z→c.\r
const h = 0.5;\r
const edgesA = makeEdges([\r
  -h,-h,-h,  h,-h,-h,   -h, h,-h,  h, h,-h,\r
  -h,-h, h,  h,-h, h,   -h, h, h,  h, h, h,\r
], 0x60a5fa); // blue\r
\r
const edgesB = makeEdges([\r
  -h,-h,-h, -h, h,-h,    h,-h,-h,  h, h,-h,\r
  -h,-h, h, -h, h, h,    h,-h, h,  h, h, h,\r
], 0xc084fc); // purple\r
\r
const edgesC = makeEdges([\r
  -h,-h,-h, -h,-h, h,    h,-h,-h,  h,-h, h,\r
  -h, h,-h, -h, h, h,    h, h,-h,  h, h, h,\r
], 0xfbbf24); // yellow\r
\r
// Sphere (r = 10, fixed)\r
scene.add(new THREE.Mesh(\r
  new THREE.SphereGeometry(10, 36, 18),\r
  new THREE.MeshPhongMaterial({ color: 0xf97316, transparent: true, opacity: 0.06, side: THREE.FrontSide, depthWrite: false })\r
));\r
scene.add(new THREE.LineSegments(\r
  new THREE.WireframeGeometry(new THREE.SphereGeometry(10, 20, 10)),\r
  new THREE.LineBasicMaterial({ color: 0xf97316, opacity: 0.16, transparent: true })\r
));\r
\r
// Space diagonal (green)\r
const diagPos = new Float32Array(6);\r
const diagAttr = new THREE.BufferAttribute(diagPos, 3);\r
const diagGeo = new THREE.BufferGeometry();\r
diagGeo.setAttribute('position', diagAttr);\r
const diagLine = new THREE.Line(diagGeo, new THREE.LineBasicMaterial({ color: 0x4ade80 }));\r
scene.add(diagLine);\r
\r
const allEdges = [edgesA, edgesB, edgesC];\r
\r
function compute(a) {\r
  const S = 28 - a, P = 192 - a * S;\r
  const disc = S * S - 4 * P;\r
  if (disc < 0) return null;\r
  const sq = Math.sqrt(disc);\r
  const b = (S + sq) / 2, c = (S - sq) / 2;\r
  return (b > 0 && c > 0) ? { b, c } : null;\r
}\r
\r
function update() {\r
  const a = parseFloat(document.getElementById('sl').value);\r
  document.getElementById('av').textContent = a.toFixed(2);\r
  const res = compute(a);\r
  const visible = !!res;\r
  boxMesh.visible = diagLine.visible = visible;\r
  allEdges.forEach(e => e.visible = visible);\r
  if (!res) {\r
    ['va','vb','vc','vr','vsa','vel'].forEach(id => { document.getElementById(id).textContent = '-'; });\r
    document.getElementById('foot').textContent = 'No valid solution for this value of a';\r
    document.getElementById('foot').className = 'foot err';\r
    return;\r
  }\r
  const { b, c } = res;\r
  const r = Math.sqrt(a*a + b*b + c*c) / 2;\r
  const sa = 2*(a*b + b*c + c*a);\r
  const el = 4*(a + b + c);\r
  document.getElementById('va').textContent  = a.toFixed(3);\r
  document.getElementById('vb').textContent  = b.toFixed(3);\r
  document.getElementById('vc').textContent  = c.toFixed(3);\r
  document.getElementById('vr').textContent  = r.toFixed(4);\r
  document.getElementById('vsa').textContent = sa.toFixed(2);\r
  document.getElementById('vel').textContent = el.toFixed(2);\r
  document.getElementById('foot').textContent = 'r = ' + r.toFixed(6) + ' — always exactly 10!';\r
  document.getElementById('foot').className = 'foot';\r
  boxMesh.scale.set(a, b, c);\r
  edgesA.scale.set(a, b, c);\r
  edgesB.scale.set(a, b, c);\r
  edgesC.scale.set(a, b, c);\r
  diagPos[0] = -a/2; diagPos[1] = -b/2; diagPos[2] = -c/2;\r
  diagPos[3] =  a/2; diagPos[4] =  b/2; diagPos[5] =  c/2;\r
  diagAttr.needsUpdate = true;\r
}\r
\r
document.getElementById('sl').addEventListener('input', update);\r
\r
function resize() {\r
  const w = cw.clientWidth, h = Math.round(w * 0.55);\r
  renderer.setSize(w, h, false);\r
  camera.aspect = w / h;\r
  camera.updateProjectionMatrix();\r
  reportH();\r
}\r
\r
function reportH() {\r
  window.parent.postMessage({ iframeHeight: document.documentElement.scrollHeight + 4 }, '*');\r
}\r
\r
new ResizeObserver(resize).observe(cw);\r
resize();\r
update();\r
\r
(function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); })();\r
setTimeout(reportH, 600);\r
<\/script>\r
</body></html>\r
\`\`\`\r
`;export{e as default};