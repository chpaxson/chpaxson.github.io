var e=`<!-- metadata -->\r
2009 AMC12A\r
Problem 22\r
answer = 1\r
\r
\r
# Problem\r
A regular octahedron has side length 1. A plane parallel to two of its opposite faces cuts the octahedron into two \r
congruent solids. What is the area of the polygon formed by the intersection of the plane and the octahedron?\r
\r
answers = $\\frac{3\\sqrt{3}}{8}$, $\\frac{\\sqrt{3}}{4}$, $\\frac{3\\sqrt{3}}{4}$, $\\frac{3}{4}$, $\\frac{\\sqrt{3}}{2}$\r
\r
# Solution\r
\r
**Setting up coordinates.** Place the regular octahedron with vertices at $(\\pm a, 0, 0)$, $(0, \\pm a, 0)$, $(0, 0, \\pm a)$, where the edge length is $a\\sqrt{2}$. For unit edge: $a = \\frac{1}{\\sqrt{2}}$.\r
\r
**Identifying the opposite faces.** One pair of opposite (parallel) faces lies in the planes $x+y+z = a$ and $x+y+z = -a$. A plane parallel to both and equidistant from each is $x+y+z = 0$.\r
\r
**Finding the cross-section.** Label the top-side vertices $A=(a,0,0)$, $B=(0,a,0)$, $C=(0,0,a)$ (with $x+y+z>0$) and the bottom-side vertices $D=(-a,0,0)$, $E=(0,-a,0)$, $F=(0,0,-a)$ (with $x+y+z<0$). The plane $x+y+z=0$ crosses exactly the 6 **belt edges** connecting upper to lower vertices (e.g.\\ $AE$, $AF$, $BD$, $BF$, $CD$, $CE$), each at its midpoint.\r
\r
The 6 midpoints are:\r
$$M_{AE}=\\tfrac{a}{2}(1,-1,0),\\; M_{BF}=\\tfrac{a}{2}(0,1,-1),\\; M_{CD}=\\tfrac{a}{2}(-1,0,1),\\ldots$$\r
\r
**Verifying the hexagon is regular.** Each hexagon side is a **midsegment** of one of the lateral triangular faces, so by the midpoint theorem its length equals half the opposite edge of that triangle. For unit edge, each face has edge 1, so:\r
$$\\text{hexagon side } s = \\tfrac{1}{2}$$\r
All six sides are equal and the interior angles are all $120°$ (verified by dot product), confirming a **regular hexagon**.\r
\r
**Area.**\r
$$A = \\frac{3\\sqrt{3}}{2}s^2 = \\frac{3\\sqrt{3}}{2}\\cdot\\frac{1}{4} = \\boxed{\\dfrac{3\\sqrt{3}}{8}}$$\r
\r
The answer is $\\textbf{(A)}$.\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style>\r
*{box-sizing:border-box;margin:0;padding:0}\r
body{background:#0d0d1a;overflow:hidden;font-family:system-ui,sans-serif}\r
canvas{display:block}\r
#hint{position:absolute;top:12px;left:12px;color:#445;font-size:11px;line-height:1.9}\r
#ui{\r
  position:absolute;bottom:16px;left:50%;transform:translateX(-50%);\r
  background:rgba(10,10,30,.92);border:1px solid rgba(120,140,255,.3);\r
  border-radius:12px;padding:10px 24px;display:flex;align-items:center;gap:14px\r
}\r
#ui label{color:#99a;font-size:12px;white-space:nowrap}\r
input[type=range]{\r
  flex:1;-webkit-appearance:none;height:4px;border-radius:2px;width:200px;\r
  background:linear-gradient(to right,#4a9eff,#9b6bff);cursor:pointer;outline:none\r
}\r
input[type=range]::-webkit-slider-thumb{\r
  -webkit-appearance:none;width:16px;height:16px;border-radius:50%;\r
  background:#fff;cursor:pointer;box-shadow:0 0 6px rgba(74,158,255,.7)\r
}\r
#legend{\r
  position:absolute;top:12px;right:12px;\r
  background:rgba(10,10,30,.88);border:1px solid rgba(120,140,255,.25);\r
  border-radius:10px;padding:10px 16px;font-size:12px;line-height:2.2;color:#aac\r
}\r
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">Regular Octahedron, edge = 1</b><br>\r
  <span style="color:#4a9eff">●</span> Upper half &nbsp;\r
  <span style="color:#ff6644">●</span> Lower half<br>\r
  <span style="color:#ffcc44">━</span> Hexagonal cross-section<br>\r
  Side = ½ &nbsp;·&nbsp; Area = <b style="color:#7cf">3√3/8</b>\r
</div>\r
<div id="ui">\r
  <label>Together</label>\r
  <input type="range" id="sl" min="0" max="100" value="0"/>\r
  <label>Separated</label>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const a = 1/Math.sqrt(2); // so edge = a*sqrt(2) = 1\r
const GOLD = 0xffcc44;\r
\r
// 6 octahedron vertices\r
const V = {\r
  A: new THREE.Vector3( a,  0,  0),\r
  B: new THREE.Vector3( 0,  a,  0),\r
  C: new THREE.Vector3( 0,  0,  a),\r
  D: new THREE.Vector3(-a,  0,  0),\r
  E: new THREE.Vector3( 0, -a,  0),\r
  F: new THREE.Vector3( 0,  0, -a),\r
};\r
\r
// Midpoints of belt edges (hexagon vertices)\r
function mid(p, q) { return p.clone().add(q).multiplyScalar(0.5); }\r
const H = [\r
  mid(V.A, V.E),  // MAE\r
  mid(V.A, V.F),  // MAF\r
  mid(V.B, V.F),  // MBF\r
  mid(V.B, V.D),  // MBD\r
  mid(V.C, V.D),  // MCD\r
  mid(V.C, V.E),  // MCE\r
];\r
\r
// Upper half faces: ABC + upper halves of 6 lateral faces\r
// Upper vertices: A, B, C (x+y+z > 0)\r
// Each lateral face that has 1 upper vertex → gives trapezoid (upper half)\r
// Each lateral face that has 2 upper vertices → gives triangle (lower half, so flip)\r
// Actually:\r
// Faces with 2 upper vertices (upper halves are trapezia):\r
//   ABF: A(+), B(+), F(-) → upper part = A,B,H[2],H[1]\r
//   BCE: B(+), C(+), E(-) → upper part = B,C,H[5],H[2]... wait need correct hex ordering\r
// Faces with 1 upper vertex:\r
//   AEF: A(+), E(-), F(-) → upper part = A, H[0], H[1]\r
//   BDF: B(+), D(-), F(-) → upper part = B, H[3], H[2]\r
//   CDE: C(+), D(-), E(-) → upper part = C, H[4], H[5]\r
// Also: face ABC (top face, fully above cut)\r
//\r
// Lower half faces: DEF + symmetric lower parts\r
// By symmetry just negate all coords for lower\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 50);\r
camera.position.set(1.5, 1.3, 1.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0,0,0); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(2, 3, 2); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.4);\r
fill.position.set(-2, 1, -2); scene.add(fill);\r
\r
function triMesh(p0, p1, p2, color, opacity=0.55) {\r
  const geo = new THREE.BufferGeometry();\r
  const pos = new Float32Array([...p0.toArray(),...p1.toArray(),...p2.toArray()]);\r
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));\r
  geo.setIndex([0,1,2]);\r
  geo.computeVertexNormals();\r
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color, side: THREE.DoubleSide, transparent: true, opacity,\r
    roughness: 0.35, depthWrite: false\r
  }));\r
}\r
\r
function quadMesh(p0, p1, p2, p3, color, opacity=0.55) {\r
  const geo = new THREE.BufferGeometry();\r
  const pos = new Float32Array([...p0.toArray(),...p1.toArray(),...p2.toArray(),...p3.toArray()]);\r
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));\r
  geo.setIndex([0,1,2, 0,2,3]);\r
  geo.computeVertexNormals();\r
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color, side: THREE.DoubleSide, transparent: true, opacity,\r
    roughness: 0.35, depthWrite: false\r
  }));\r
}\r
\r
const BLUE = 0x3d8ef0, RED = 0xff6644;\r
\r
// Upper half meshes (groups so we can move them up)\r
const upperGroup = new THREE.Group();\r
upperGroup.add(triMesh(V.A, V.B, V.C, BLUE));        // top face\r
upperGroup.add(triMesh(V.A, H[0], H[1], BLUE));       // half of AEF (upper triangle)\r
upperGroup.add(triMesh(V.B, H[2], H[3], BLUE));       // half of BDF\r
upperGroup.add(triMesh(V.C, H[4], H[5], BLUE));       // half of CDE\r
upperGroup.add(quadMesh(V.A, V.B, H[2], H[1], BLUE)); // half of ABF (trapezoid: A,B → belt)\r
upperGroup.add(quadMesh(V.B, V.C, H[5], H[2], BLUE)); // wait, need to check adjacency...\r
// Let me redo: face BCE: B(+),C(+),E(-). E is connected to B? Let me check: |BE|=√(a²+a²)=1 ✓.\r
// BCE upper part: B, C, H(CE), H(BE). H[5]=mid(CE), but need mid(BE).\r
// Hmm wait — I need mid(BE) which isn't in my hex array as defined. Let me reconsider.\r
// Actually the 6 belt edges are: AE, AF, BD, BF, CD, CE (edges crossing the cut plane).\r
// H[0]=mid(AE), H[1]=mid(AF), H[2]=mid(BF), H[3]=mid(BD), H[4]=mid(CD), H[5]=mid(CE).\r
// Face ABF: A(+),B(+),F(-). Upper part: trapezoid A, B, mid(BF)=H[2], mid(AF)=H[1].  ✓\r
// Face ACE: A(+),C(+),E(-). Upper part: A, C, mid(CE)=H[5], mid(AE)=H[0]. ✓\r
// Face BCD: B(+),C(+),D(-). Upper part: B, C, mid(CD)=H[4], mid(BD)=H[3]. ✓\r
// Face AEF: A(+),E(-),F(-). Upper part: triangle A, mid(AE)=H[0], mid(AF)=H[1]. ✓\r
// Face BDF: B(+),D(-),F(-). Upper part: triangle B, mid(BD)=H[3], mid(BF)=H[2]. ✓\r
// Face CDE: C(+),D(-),E(-). Upper part: triangle C, mid(CD)=H[4], mid(CE)=H[5]. ✓\r
scene.remove(...upperGroup.children);\r
upperGroup.clear();\r
upperGroup.add(triMesh(V.A, V.B, V.C, BLUE));\r
upperGroup.add(quadMesh(V.A, V.B, H[2], H[1], BLUE));  // ABF upper\r
upperGroup.add(quadMesh(V.A, V.C, H[5], H[0], BLUE));  // ACE upper\r
upperGroup.add(quadMesh(V.B, V.C, H[4], H[3], BLUE));  // BCD upper\r
upperGroup.add(triMesh(V.A, H[0], H[1], BLUE));         // AEF upper\r
upperGroup.add(triMesh(V.B, H[3], H[2], BLUE));         // BDF upper\r
upperGroup.add(triMesh(V.C, H[4], H[5], BLUE));         // CDE upper\r
scene.add(upperGroup);\r
\r
// Lower half = mirror (negate all) of upper\r
const lowerGroup = new THREE.Group();\r
function neg(v) { return v.clone().negate(); }\r
lowerGroup.add(triMesh(neg(V.A), neg(V.B), neg(V.C), RED));\r
lowerGroup.add(quadMesh(neg(V.A), neg(V.B), neg(H[2]), neg(H[1]), RED));\r
lowerGroup.add(quadMesh(neg(V.A), neg(V.C), neg(H[5]), neg(H[0]), RED));\r
lowerGroup.add(quadMesh(neg(V.B), neg(V.C), neg(H[4]), neg(H[3]), RED));\r
lowerGroup.add(triMesh(neg(V.A), neg(H[0]), neg(H[1]), RED));\r
lowerGroup.add(triMesh(neg(V.B), neg(H[3]), neg(H[2]), RED));\r
lowerGroup.add(triMesh(neg(V.C), neg(H[4]), neg(H[5]), RED));\r
scene.add(lowerGroup);\r
\r
// Hexagon cross-section (gold outline + filled)\r
const hexPts = [...H, H[0]];\r
const hexGeo = new THREE.BufferGeometry().setFromPoints(hexPts);\r
scene.add(new THREE.Line(hexGeo, new THREE.LineBasicMaterial({ color: GOLD, linewidth: 2 })));\r
\r
// Filled hexagon (fan from H[0])\r
const hexFillGeo = new THREE.BufferGeometry();\r
const fillPts = [];\r
for (let i=1; i<5; i++) { fillPts.push(...H[0].toArray(), ...H[i].toArray(), ...H[i+1].toArray()); }\r
hexFillGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(fillPts.flat()), 3));\r
hexFillGeo.computeVertexNormals();\r
const hexFill = new THREE.Mesh(hexFillGeo, new THREE.MeshBasicMaterial({\r
  color: GOLD, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false\r
}));\r
scene.add(hexFill);\r
\r
// Separation slider\r
const SEP = 0.6; // max separation distance\r
document.getElementById('sl').addEventListener('input', e => {\r
  const t = e.target.value / 100;\r
  upperGroup.position.y = t * SEP;\r
  lowerGroup.position.y = -t * SEP;\r
  hexFill.material.opacity = 0.18 + t * 0.25;\r
});\r
\r
function animate() { requestAnimationFrame(animate); orbit.update(); renderer.render(scene, camera); }\r
animate();\r
\r
window.addEventListener('resize', () => {\r
  camera.aspect = innerWidth/innerHeight;\r
  camera.updateProjectionMatrix();\r
  renderer.setSize(innerWidth, innerHeight);\r
});\r
window.parent.postMessage({ iframeHeight: 490 }, '*');\r
<\/script></body></html>\r
\`\`\`the two faces is a hexagon.\r
\r
\r
`;export{e as default};