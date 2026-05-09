var e=`<!-- metadata -->\r
2019 AMC10A\r
Problem 21\r
answer = 3\r
\r
\r
# Problem\r
A sphere with center $O$ has radius $6$.  A triangle with sides of length $15$, $15$, and $24$ is situated in space so that each of its sides is tangent to the sphere.  What is the distance between $O$ and the plane determined by the triangle?\r
\r
answers = $2\\sqrt{3}$, $4$, $3\\sqrt{2}$, $2\\sqrt{5}$, $5$\r
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
// ── Geometry of the triangle ──────────────────────────────────────────────────\r
// Isosceles triangle: sides 15, 15, 24. Place base along x-axis, centred at origin.\r
// Base half = 12, height = sqrt(15²−12²) = sqrt(81) = 9\r
const BASE = 24, LEG = 15;\r
const halfBase = 12, triHeight = 9; // 9 = sqrt(225-144)\r
\r
// Vertices (in the plane y=0):\r
const A = new THREE.Vector3(-halfBase, 0, 0);\r
const B = new THREE.Vector3( halfBase, 0, 0);\r
const C = new THREE.Vector3(0, 0, -triHeight); // apex "into" screen\r
\r
// Incenter (for isosceles, lies on altitude from apex, at distance r from base)\r
// s=27, area=108, r=4\r
const inr = 4;\r
// Incenter x=0 by symmetry; z: distance from base line (y=0, z=0... base is y=z=0 line)\r
// The incenter is at z = -r_offset where r_offset satisfies tangency to base.\r
// Actually: incenter coords = (a·xA + b·xB + c·xC)/(a+b+c)\r
// a=|BC|=15, b=|AC|=15, c=|AB|=24\r
// ix = (15*(-12)+15*12+24*0)/54 = 0\r
// iz = (15*0 + 15*0 + 24*(-9))/54 = -216/54 = -4\r
const incenter = new THREE.Vector3(0, 0, -4);\r
\r
// Sphere: radius 6, center O at (0, d, -4) where d = 2√5\r
const sphereR = 6;\r
const d = 2 * Math.sqrt(5); // ≈ 4.47\r
const O = new THREE.Vector3(0, d, -4);\r
\r
// ── Renderer / scene ──────────────────────────────────────────────────────────\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(devicePixelRatio);\r
renderer.setSize(window.innerWidth, window.innerHeight);\r
document.body.appendChild(renderer.domElement);\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x1a1a2e);\r
scene.add(new THREE.AmbientLight(0xffffff, 0.55));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.9);\r
dl.position.set(6, 10, 8); scene.add(dl);\r
\r
const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 300);\r
camera.position.set(20, 14, 18);\r
camera.lookAt(0, d / 2, -4);\r
\r
const controls = new OrbitControls(camera, renderer.domElement);\r
controls.target.set(0, d / 2, -4);\r
controls.enableDamping = true;\r
\r
// ── Triangle (filled, transparent) ───────────────────────────────────────────\r
{\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.Float32BufferAttribute([\r
    A.x,A.y,A.z, B.x,B.y,B.z, C.x,C.y,C.z\r
  ], 3));\r
  geo.setIndex([0,1,2]);\r
  geo.computeVertexNormals();\r
  scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color: 0x4a90d9, side: THREE.DoubleSide, transparent: true, opacity: 0.22, depthWrite: false\r
  })));\r
  // Edges\r
  const edgePts = [A, B, B, C, C, A];\r
  const edgeArr = [];\r
  edgePts.forEach(v => { edgeArr.push(v.x, v.y, v.z); });\r
  const eg = new THREE.BufferGeometry();\r
  eg.setAttribute('position', new THREE.Float32BufferAttribute(edgeArr, 3));\r
  scene.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x74b9ff, linewidth: 2 })));\r
}\r
\r
// ── Sphere ────────────────────────────────────────────────────────────────────\r
{\r
  const mat = new THREE.MeshStandardMaterial({ color: 0xf39c12, transparent: true, opacity: 0.35,\r
    roughness: 0.2, metalness: 0.1, depthWrite: false });\r
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(sphereR, 48, 48), mat);\r
  sphere.position.copy(O);\r
  scene.add(sphere);\r
  // Wireframe ring\r
  const wMat = new THREE.MeshBasicMaterial({ color: 0xf39c12, wireframe: true, transparent: true, opacity: 0.15 });\r
  const wire = new THREE.Mesh(new THREE.SphereGeometry(sphereR, 16, 8), wMat);\r
  wire.position.copy(O);\r
  scene.add(wire);\r
}\r
\r
// ── Helper: dashed line ───────────────────────────────────────────────────────\r
function dash(a, b, color, opacity = 0.9) {\r
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);\r
  const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.3, gapSize: 0.15,\r
    transparent: true, opacity, depthTest: false });\r
  const l = new THREE.Line(geo, mat); l.computeLineDistances(); scene.add(l);\r
}\r
\r
// Vertical drop from O to incenter (the distance d = 2√5)\r
const Ofoot = new THREE.Vector3(0, 0, -4); // foot on triangle plane\r
dash(O, Ofoot, 0xc39bd3);\r
\r
// Right-angle marker at foot (small square)\r
{\r
  const s = 0.45;\r
  const sq = new THREE.BufferGeometry().setFromPoints([\r
    new THREE.Vector3(s, 0, -4), new THREE.Vector3(s, 0, -4+s),\r
    new THREE.Vector3(0, 0, -4+s)\r
  ]);\r
  scene.add(new THREE.Line(sq, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })));\r
}\r
\r
// Line from incenter to nearest point on base (shows inradius r=4)\r
const tangentPtBase = new THREE.Vector3(0, 0, 0); // foot of perp from incenter to base\r
dash(Ofoot, tangentPtBase, 0x5b9cf6);\r
\r
// Line from O to that tangent point on base (= sphere radius = 6)\r
dash(O, tangentPtBase, 0xf39c12);\r
\r
// Center O dot\r
{\r
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16),\r
    new THREE.MeshBasicMaterial({ color: 0xffffff }));\r
  dot.position.copy(O); scene.add(dot);\r
}\r
// Incenter dot\r
{\r
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16),\r
    new THREE.MeshBasicMaterial({ color: 0xc39bd3 }));\r
  dot.position.copy(Ofoot); scene.add(dot);\r
}\r
\r
// ── Labels ────────────────────────────────────────────────────────────────────\r
const labelsDiv = document.getElementById('labels');\r
const labelDefs = [];\r
function addLabel(text, color, pos) {\r
  const el = document.createElement('div');\r
  el.className = 'lbl'; el.style.color = color; el.textContent = text;\r
  labelsDiv.appendChild(el); labelDefs.push({ el, pos });\r
}\r
// d = 2√5 (vertical)\r
addLabel('d = 2√5', '#c39bd3', new THREE.Vector3(0.9, d / 2, -4));\r
// r = 4 (inradius, blue)\r
addLabel('r = 4', '#5b9cf6', new THREE.Vector3(0.9, 0, -2));\r
// radius = 6 (orange hypotenuse)\r
addLabel('R = 6', '#f39c12', new THREE.Vector3(3.5, d / 2 + 0.5, -1));\r
// Triangle labels\r
addLabel('24', '#74b9ff', new THREE.Vector3(0, -0.7, 0));\r
addLabel('15', '#74b9ff', new THREE.Vector3(7, -0.7, -4.5));\r
addLabel('15', '#74b9ff', new THREE.Vector3(-7, -0.7, -4.5));\r
addLabel('O', '#ffffff', new THREE.Vector3(0, d + 0.6, -4));\r
\r
// ── Animate ───────────────────────────────────────────────────────────────────\r
const tmp = new THREE.Vector3();\r
function project(p) {\r
  tmp.copy(p).project(camera);\r
  return { x: (tmp.x+1)/2*window.innerWidth, y: (1-(tmp.y+1)/2)*window.innerHeight };\r
}\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  labelDefs.forEach(({ el, pos }) => {\r
    const p = project(pos); el.style.left = p.x+'px'; el.style.top = p.y+'px';\r
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
**Step 1: Find the inradius of the triangle.**\r
\r
The triangle has sides $a = 15$, $b = 15$, $c = 24$. Using Heron's formula:\r
$$s = \\frac{15+15+24}{2} = 27, \\qquad A = \\sqrt{27 \\cdot 12 \\cdot 12 \\cdot 3} = \\sqrt{11664} = 108$$\r
$$r = \\frac{A}{s} = \\frac{108}{27} = 4$$\r
\r
**Step 2: Locate the sphere center.**\r
\r
Let $d$ be the distance from $O$ to the plane of the triangle, and let $P$ be the foot of the perpendicular from $O$ to that plane. Since the sphere is tangent to all three sides, $P$ is equidistant from all three sides in the plane — so $P$ must be the **incenter**, at distance $r = 4$ from each side.\r
\r
**Step 3: Apply the 3D distance formula.**\r
\r
The distance from $O$ to each side (a line in 3D) equals:\r
$$\\sqrt{d^2 + r^2} = R \\implies \\sqrt{d^2 + 16} = 6 \\implies d^2 = 20 \\implies d = \\boxed{2\\sqrt{5}}$$\r
`;export{e as default};