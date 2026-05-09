var e=`<!-- metadata -->\r
2013 AMC10A\r
Problem 22\r
answer = 1\r
\r
\r
# Problem\r
Six spheres of radius $1$ are positioned so that their centers are at the vertices of a regular hexagon of side length 2.  The six spheres are internally tangent to a larger sphere whose center is the center of the hexagon.  An eighth sphere is externally tangent to the six smaller spheres and internally tangent to the larger sphere.  What is the radius of this eighth sphere?\r
\r
answers = $\\sqrt{2}$, $3/2$, $5/3$, $\\sqrt{3}$, $2$\r
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
  * { margin:0; padding:0; box-sizing:border-box; }\r
  html, body { width:100%; height:100%; background:#1a1a2e; overflow:hidden; font-family:sans-serif; }\r
  canvas { display:block; }\r
  #labels { position:absolute; top:0; left:0; pointer-events:none; }\r
  .lbl { position:absolute; font-size:12px; font-weight:600; background:rgba(0,0,0,0.65);\r
         padding:2px 6px; border-radius:4px; transform:translate(-50%,-50%); white-space:nowrap; }\r
  #hint { position:absolute; bottom:8px; left:50%; transform:translateX(-50%);\r
          font-size:11px; color:rgba(255,255,255,0.35); pointer-events:none; }\r
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
const R_LARGE = 3;       // large sphere radius\r
const r_small = 1;       // small sphere radius\r
const r_eighth = 1.5;    // eighth sphere radius (3/2)\r
const hexR = 2;          // distance from center to small sphere centers\r
const h = R_LARGE - r_eighth; // = 1.5, height of eighth sphere center above plane\r
\r
// ── Renderer / scene ──────────────────────────────────────────────────────────\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(devicePixelRatio);\r
renderer.setSize(window.innerWidth, window.innerHeight);\r
document.body.appendChild(renderer.domElement);\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x1a1a2e);\r
scene.add(new THREE.AmbientLight(0xffffff, 0.5));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.9);\r
dl.position.set(5, 10, 8); scene.add(dl);\r
\r
const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 200);\r
camera.position.set(8, 6, 10);\r
camera.lookAt(0, h / 2, 0);\r
\r
const controls = new OrbitControls(camera, renderer.domElement);\r
controls.target.set(0, h / 2, 0);\r
controls.enableDamping = true;\r
\r
// ── Large sphere (transparent) ────────────────────────────────────────────────\r
const largeMat = new THREE.MeshStandardMaterial({\r
  color: 0x2a6496, transparent: true, opacity: 0.12,\r
  side: THREE.DoubleSide, depthWrite: false\r
});\r
const largeSphere = new THREE.Mesh(new THREE.SphereGeometry(R_LARGE, 48, 48), largeMat);\r
scene.add(largeSphere);\r
// Wireframe overlay\r
const lwMat = new THREE.MeshBasicMaterial({ color: 0x4a90d9, wireframe: true, transparent: true, opacity: 0.08 });\r
scene.add(new THREE.Mesh(new THREE.SphereGeometry(R_LARGE, 24, 12), lwMat));\r
\r
// ── 6 small spheres at hexagon vertices ──────────────────────────────────────\r
const smallMat = new THREE.MeshStandardMaterial({ color: 0x5b9cf6, roughness: 0.25, metalness: 0.1 });\r
const smallCenters = [];\r
for (let i = 0; i < 6; i++) {\r
  const angle = (Math.PI / 3) * i;\r
  const cx = hexR * Math.cos(angle);\r
  const cz = hexR * Math.sin(angle);\r
  const center = new THREE.Vector3(cx, 0, cz);\r
  smallCenters.push(center);\r
  const m = new THREE.Mesh(new THREE.SphereGeometry(r_small, 32, 32), smallMat);\r
  m.position.copy(center);\r
  scene.add(m);\r
}\r
\r
// ── Eighth sphere (above, orange) ─────────────────────────────────────────────\r
const eighthMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.2, metalness: 0.1 });\r
const eighthSphere = new THREE.Mesh(new THREE.SphereGeometry(r_eighth, 40, 40), eighthMat);\r
eighthSphere.position.set(0, h, 0);\r
scene.add(eighthSphere);\r
\r
// ── Dashed line helper ────────────────────────────────────────────────────────\r
function dash(a, b, color, opacity = 0.9) {\r
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);\r
  const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.2, gapSize: 0.1,\r
    transparent: true, opacity, depthTest: false });\r
  const l = new THREE.Line(geo, mat);\r
  l.computeLineDistances();\r
  scene.add(l);\r
}\r
\r
// Center of everything\r
const origin = new THREE.Vector3(0, 0, 0);\r
const eighthCenter = new THREE.Vector3(0, h, 0);\r
// Pick one small sphere for annotation\r
const s0 = smallCenters[0]; // (2, 0, 0)\r
\r
// Horizontal distance from origin to small sphere center (= 2)\r
dash(origin, new THREE.Vector3(s0.x, 0, s0.z), 0x74b9ff);\r
\r
// Vertical from origin to eighth sphere center (= h = 3/2)\r
dash(origin, eighthCenter, 0xc39bd3);\r
\r
// From eighth center to small sphere center (= 1 + 3/2 = 5/2)\r
dash(eighthCenter, s0, 0xf39c12);\r
\r
// Large sphere radius to small sphere center (= 3)\r
dash(origin, s0, 0x2ecc71, 0.7);\r
\r
// ── Hexagon outline connecting small sphere centers ───────────────────────────\r
{\r
  const pts = [...smallCenters, smallCenters[0]]; // close the loop\r
  const hexArr = [];\r
  pts.forEach(v => { hexArr.push(v.x, v.y, v.z); });\r
  const hexGeo = new THREE.BufferGeometry();\r
  hexGeo.setAttribute('position', new THREE.Float32BufferAttribute(hexArr, 3));\r
  scene.add(new THREE.Line(hexGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, depthTest: false })));\r
}\r
\r
// Dot at origin\r
const originDot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16),\r
  new THREE.MeshBasicMaterial({ color: 0xffffff }));\r
scene.add(originDot);\r
\r
// ── Labels ────────────────────────────────────────────────────────────────────\r
const labelsDiv = document.getElementById('labels');\r
const labelDefs = [];\r
function addLabel(text, color, pos) {\r
  const el = document.createElement('div');\r
  el.className = 'lbl'; el.style.color = color; el.textContent = text;\r
  labelsDiv.appendChild(el);\r
  labelDefs.push({ el, pos: pos.clone() });\r
}\r
\r
addLabel('R = 3', '#2ecc71',\r
  new THREE.Vector3(s0.x / 2 + 0.3, 0.5, s0.z / 2));\r
addLabel('h = 3/2', '#c39bd3',\r
  new THREE.Vector3(0.5, h / 2, 0));\r
addLabel('r₁+r₈ = 5/2', '#f39c12',\r
  new THREE.Vector3(s0.x / 2 - 0.5, h / 2 + 0.4, s0.z / 2));\r
addLabel('2', '#74b9ff',\r
  new THREE.Vector3(s0.x / 2, -0.5, s0.z / 2));\r
addLabel('r₈ = 3/2', '#f39c12',\r
  new THREE.Vector3(0, h + r_eighth + 0.4, 0));\r
addLabel('r₁ = 1', '#5b9cf6',\r
  new THREE.Vector3(s0.x + 0.6, 0.6, s0.z));\r
addLabel('O', '#ffffff', new THREE.Vector3(0.35, 0.2, 0));\r
\r
// ── Animate ───────────────────────────────────────────────────────────────────\r
const tmp = new THREE.Vector3();\r
function project(p) {\r
  tmp.copy(p).project(camera);\r
  return { x: (tmp.x + 1) / 2 * window.innerWidth, y: (1 - (tmp.y + 1) / 2) * window.innerHeight };\r
}\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  labelDefs.forEach(({ el, pos }) => {\r
    const p = project(pos);\r
    el.style.left = p.x + 'px';\r
    el.style.top = p.y + 'px';\r
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
window.parent.postMessage({ iframeHeight: 500 }, '*');\r
<\/script>\r
</body>\r
</html>\r
\`\`\`\r
\r
**Step 1: Find the radius of the large sphere.**\r
\r
The centers of the six small spheres lie at the vertices of a regular hexagon with side length 2. For a regular hexagon, the circumradius equals the side length, so each small sphere's center is **distance 2** from the hexagon's center $O$. Since each small sphere (radius 1) is internally tangent to the large sphere (radius $R$):\r
$$R - 1 = 2 \\implies R = 3$$\r
\r
**Step 2: Set up coordinates for the eighth sphere.**\r
\r
By symmetry, the eighth sphere's center lies on the axis perpendicular to the hexagon plane through $O$, at height $h$ above the plane. Let its radius be $r$.\r
\r
- **Internally tangent to large sphere:** distance from $O$ to eighth center $= R - r$, so $h = 3 - r$.\r
- **Externally tangent to each small sphere:** distance from eighth center $(0, h, 0)$ to a small center $(2, 0, 0)$ equals $1 + r$:\r
$$\\sqrt{4 + h^2} = 1 + r$$\r
\r
**Step 3: Solve.**\r
\r
Substitute $h = 3 - r$:\r
$$4 + (3-r)^2 = (1+r)^2$$\r
$$4 + 9 - 6r + r^2 = 1 + 2r + r^2$$\r
$$13 - 6r = 1 + 2r \\implies 12 = 8r \\implies r = \\boxed{\\dfrac{3}{2}}$$\r
`;export{e as default};