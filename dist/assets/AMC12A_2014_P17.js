var e=`<!-- metadata -->\r
2014 AMC12A\r
Problem 17\r
answer = 1\r
\r
\r
# Problem\r
A $4 \\times 4 \\times h$ rectangular box contains a sphere of radius $2$ and eight smaller spheres of radius $1$.  The smaller spheres are each tangent to three sides of the box, and the larger sphere i tangent to each of the smaller spheres.  What is $h$?\r
\r
answers = $2+2\\sqrt{7}$, $3+2\\sqrt{5}$, $4+2\\sqrt{7}$, $4\\sqrt{5}$, $4\\sqrt{7}$\r
\r
\r
# Solution\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
<meta charset="UTF-8"/>\r
<style>\r
  * { margin: 0; padding: 0; box-sizing: border-box; }\r
  html, body { width: 100%; height: 100%; background: #0f0f1a; overflow: hidden; font-family: sans-serif; }\r
  canvas { display: block; }\r
  #labels { position: absolute; top: 0; left: 0; pointer-events: none; }\r
  .lbl { position: absolute; font-size: 12px; font-weight: 600; background: rgba(0,0,0,0.65);\r
    padding: 2px 6px; border-radius: 4px; transform: translate(-50%,-50%); white-space: nowrap; }\r
  #hint { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);\r
    font-size: 11px; color: rgba(255,255,255,0.35); pointer-events: none; }\r
</style>\r
</head>\r
<body>\r
<div id="labels"></div>\r
<div id="hint">Drag to rotate · Scroll to zoom</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js",\r
            "three/addons/":"https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// ── Key values ────────────────────────────────────────────────────────────────\r
const r1 = 1, r2 = 2;\r
const BW = 4; // box width/depth\r
const sqr7 = Math.sqrt(7);\r
const h = 2 + 2 * sqr7;          // box height\r
const zc = 1 + sqr7;             // large sphere center z (= h/2)\r
\r
// ── Renderer ──────────────────────────────────────────────────────────────────\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(devicePixelRatio);\r
renderer.setSize(window.innerWidth, window.innerHeight);\r
document.body.appendChild(renderer.domElement);\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x1a1a2e);\r
scene.add(new THREE.AmbientLight(0xffffff, 0.6));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.85);\r
dl.position.set(8, 12, 10); scene.add(dl);\r
\r
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);\r
camera.position.set(10, 8, 12);\r
camera.lookAt(2, h / 2, 2);\r
\r
const controls = new OrbitControls(camera, renderer.domElement);\r
controls.target.set(2, h / 2, 2);\r
controls.enableDamping = true;\r
\r
// ── Box wireframe ─────────────────────────────────────────────────────────────\r
const boxGeo = new THREE.BoxGeometry(BW, h, BW);\r
boxGeo.translate(BW/2, h/2, BW/2);\r
scene.add(new THREE.LineSegments(\r
  new THREE.EdgesGeometry(boxGeo),\r
  new THREE.LineBasicMaterial({ color: 0x4477aa, transparent: true, opacity: 0.5 })\r
));\r
// Transparent box faces — depthWrite off so spheres always show\r
const boxFaceMesh = new THREE.Mesh(boxGeo,\r
  new THREE.MeshStandardMaterial({ color: 0x2a4a6a, transparent: true, opacity: 0.07,\r
    side: THREE.DoubleSide, depthWrite: false }));\r
scene.add(boxFaceMesh);\r
\r
// ── Helper: make a sphere mesh ────────────────────────────────────────────────\r
function makeSphere(radius, color, x, y, z) {\r
  const m = new THREE.Mesh(\r
    new THREE.SphereGeometry(radius, 40, 40),\r
    new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.1 })\r
  );\r
  m.position.set(x, y, z);\r
  scene.add(m);\r
  return m;\r
}\r
\r
// ── 8 small spheres at corners ────────────────────────────────────────────────\r
const smallColor = 0x5b9cf6;\r
const smallCenters = [];\r
[r1, BW-r1].forEach(x => [r1, BW-r1].forEach(z => {\r
  [r1, h-r1].forEach(y => {\r
    smallCenters.push([x, y, z]);\r
    makeSphere(r1, smallColor, x, y, z);\r
  });\r
}));\r
\r
// ── Large sphere at center ────────────────────────────────────────────────────\r
makeSphere(r2, 0xf39c12, BW/2, zc, BW/2);\r
\r
// ── Dashed line helper ────────────────────────────────────────────────────────\r
function dashedLine(a, b, color, opacity = 0.85) {\r
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);\r
  const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.18, gapSize: 0.1,\r
    transparent: true, opacity, depthTest: false });\r
  const l = new THREE.Line(geo, mat);\r
  l.computeLineDistances();\r
  scene.add(l);\r
}\r
\r
// Key construction lines\r
const largeC = new THREE.Vector3(BW/2, zc, BW/2);\r
const smallBot = new THREE.Vector3(r1, r1, r1);       // one bottom corner sphere\r
const smallTop = new THREE.Vector3(r1, h-r1, r1);     // matching top corner sphere\r
\r
// Center-to-center line (large → bottom corner small): hypotenuse = 3\r
dashedLine(largeC, smallBot, 0xf39c12);\r
// Horizontal leg (x-y plane): from (2,1,2) to (1,1,1) projected\r
const projBot = new THREE.Vector3(r1, r1, r1);\r
const projLargeAtY1 = new THREE.Vector3(BW/2, r1, BW/2);\r
dashedLine(projLargeAtY1, projBot, 0xe05c5c);\r
// Vertical leg: large center down to y=1 level\r
dashedLine(largeC, projLargeAtY1, 0xc39bd3);\r
// Box height indicator (right edge)\r
dashedLine(new THREE.Vector3(BW, 0, 0), new THREE.Vector3(BW, h, 0), 0x58d68d, 0.5);\r
// Vertical from ground to small sphere bottom center (r1=1)\r
dashedLine(new THREE.Vector3(r1, 0, r1), smallBot, 0x5b9cf6, 0.7);\r
\r
// ── Labels ────────────────────────────────────────────────────────────────────\r
const labelsDiv = document.getElementById('labels');\r
const labelDefs = [];\r
\r
function addLabel(text, color, pos) {\r
  const el = document.createElement('div');\r
  el.className = 'lbl'; el.style.color = color; el.textContent = text;\r
  labelsDiv.appendChild(el);\r
  labelDefs.push({ el, pos });\r
}\r
\r
// Hypotenuse label (orange): midpoint of large→small-bottom\r
addLabel('r₁+r₂ = 3', '#f39c12',\r
  new THREE.Vector3().addVectors(largeC, smallBot).multiplyScalar(0.5));\r
// Horizontal leg (red): midpoint between (1,1,1) and (2,1,2)\r
addLabel('√2', '#e05c5c',\r
  new THREE.Vector3().addVectors(projBot, projLargeAtY1).multiplyScalar(0.5)\r
    .add(new THREE.Vector3(0, 0.3, 0)));\r
// Vertical leg (purple): midpoint of large center to y=1\r
addLabel('√7', '#c39bd3',\r
  new THREE.Vector3().addVectors(largeC, projLargeAtY1).multiplyScalar(0.5)\r
    .add(new THREE.Vector3(0.4, 0, 0)));\r
// Box height (green)\r
addLabel('h = 2+2√7', '#58d68d',\r
  new THREE.Vector3(BW + 1.0, h / 2, 0));\r
// Small sphere radius\r
addLabel('r₁ = 1', '#5b9cf6',\r
  new THREE.Vector3(r1 - 0.5, r1 / 2, r1));\r
// Large sphere label\r
addLabel('r₂ = 2', '#f39c12',\r
  new THREE.Vector3(BW/2 + 2.5, zc, BW/2));\r
\r
// ── Project & animate ─────────────────────────────────────────────────────────\r
const tmp = new THREE.Vector3();\r
function project(p) {\r
  tmp.copy(p).project(camera);\r
  return {\r
    x: (tmp.x + 1) / 2 * window.innerWidth,\r
    y: (1 - (tmp.y + 1) / 2) * window.innerHeight,\r
  };\r
}\r
\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  labelDefs.forEach(({ el, pos }) => {\r
    const p = project(pos);\r
    el.style.left = p.x + 'px';\r
    el.style.top  = p.y + 'px';\r
  });\r
  renderer.render(scene, camera);\r
}\r
animate();\r
\r
window.addEventListener('resize', () => {\r
  renderer.setSize(window.innerWidth, window.innerHeight);\r
  camera.aspect = window.innerWidth / window.innerHeight;\r
  camera.updateProjectionMatrix();\r
});\r
\r
window.parent.postMessage({ iframeHeight: 520 }, '*');\r
<\/script>\r
</body>\r
</html>\r
\`\`\`\r
\r
**Setting up coordinates.** Place the box with one corner at the origin, spanning $(0,0,0)$ to $(4,4,h)$. Each small sphere (radius 1) is tangent to exactly 3 faces, placing its center 1 unit from each. The 8 small sphere centers are at all combinations of $(x, y, z)$ where $x, z \\in \\{1, 3\\}$ and $y \\in \\{1,\\ h-1\\}$.\r
\r
**Large sphere position.** The large sphere (radius 2) is tangent to all four vertical faces of the $4 \\times 4$ box, since $2 = 4/2$. By symmetry its center is at $(2,\\ y_c,\\ 2)$.\r
\r
**Tangency equation.** The distance from the large sphere's center to any bottom small sphere center (e.g. $(1, 1, 1)$) must equal $r_1 + r_2 = 3$:\r
\r
$$\\sqrt{(2-1)^2 + (y_c - 1)^2 + (2-1)^2} = 3$$\r
\r
$$\\sqrt{2 + (y_c - 1)^2} = 3 \\implies (y_c - 1)^2 = 7 \\implies y_c = 1 + \\sqrt{7}$$\r
\r
**Finding $h$.** By symmetry the large sphere must be equidistant from the top and bottom layers, so $y_c = h/2$:\r
\r
$$\\frac{h}{2} = 1 + \\sqrt{7} \\implies h = \\boxed{2 + 2\\sqrt{7}}$$\r
`;export{e as default};