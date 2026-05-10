var e=`<!-- metadata -->\r
2008 AMC10A\r
Problem 21\r
answer = 1\r
\r
\r
# Problem\r
A cube with side length 1 is sliced by a plane that passes through two diagonally opposite vertices A and C and the \r
midpoints B and D of two opposite edges not containing A or C. What is the area of quadrilateral ABCD?\r
\r
answers = $\\frac{\\sqrt{6}}{2}$, $\\frac{5}{4}$, $\\sqrt{2}$, $\\frac{5}{8}$, $\\frac{3}{4}$\r
\r
# Solution\r
\r
Place the cube with $A=(0,0,0)$ and $C=(1,1,1)$ at diagonally opposite vertices.\r
\r
**Finding B and D.** The two opposite edges not containing $A$ or $C$ that keep $A,B,C,D$ coplanar are the vertical edges $(1,0,0)\\text{–}(1,0,1)$ and $(0,1,0)\\text{–}(0,1,1)$. Their midpoints are:\r
\r
$$B = \\left(1,\\,0,\\,\\tfrac{1}{2}\\right), \\qquad D = \\left(0,\\,1,\\,\\tfrac{1}{2}\\right)$$\r
\r
**ABCD is a parallelogram.** Note that $\\vec{AB} + \\vec{AD} = (1,0,\\tfrac12) + (0,1,\\tfrac12) = (1,1,1) = \\vec{AC}$, confirming the four points are coplanar and $ABCD$ is a parallelogram.\r
\r
**Area via cross product.**\r
\r
$$\\vec{AB} = \\left(1,\\,0,\\,\\tfrac{1}{2}\\right), \\qquad \\vec{AD} = \\left(0,\\,1,\\,\\tfrac{1}{2}\\right)$$\r
\r
$$\\vec{AB}\\times\\vec{AD} = \\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\1&0&\\tfrac12\\\\0&1&\\tfrac12\\end{vmatrix} = \\left(-\\tfrac{1}{2},\\,-\\tfrac{1}{2},\\,1\\right)$$\r
\r
$$\\text{Area} = \\left|\\vec{AB}\\times\\vec{AD}\\right| = \\sqrt{\\tfrac{1}{4}+\\tfrac{1}{4}+1} = \\sqrt{\\tfrac{3}{2}} = \\boxed{\\dfrac{\\sqrt{6}}{2}}$$\r
\r
The answer is $\\textbf{(A)}\\ \\dfrac{\\sqrt{6}}{2}$.\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style>\r
*{box-sizing:border-box;margin:0;padding:0}\r
body{background:#0d0d1a;overflow:hidden;font-family:system-ui,sans-serif}\r
canvas{display:block}\r
#hint{position:absolute;top:12px;left:12px;color:#445;font-size:11px;line-height:1.9}\r
#legend{\r
  position:absolute;top:12px;right:12px;\r
  background:rgba(10,10,30,.88);border:1px solid rgba(120,140,255,.25);\r
  border-radius:10px;padding:10px 16px;font-size:12px;line-height:2.2;color:#aac\r
}\r
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">Cube Cross-Section ABCD</b><br>\r
  <span style="color:#ff6644">●</span> A, C — opposite vertices<br>\r
  <span style="color:#44ddff">●</span> B, D — edge midpoints<br>\r
  <span style="color:#ffe066">■</span> Quadrilateral ABCD<br>\r
  Area = √6 / 2\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 50);\r
camera.position.set(2.2, 1.8, 2.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0.5, 0.5, 0.5); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.2);\r
sun.position.set(3, 5, 3); scene.add(sun);\r
\r
// Cube wireframe\r
const cubeGeo = new THREE.BoxGeometry(1,1,1);\r
cubeGeo.translate(0.5, 0.5, 0.5);\r
scene.add(new THREE.LineSegments(\r
  new THREE.EdgesGeometry(cubeGeo),\r
  new THREE.LineBasicMaterial({ color: 0x2a3a5a })\r
));\r
\r
// The 4 key points\r
const A = new THREE.Vector3(0, 0, 0);\r
const B = new THREE.Vector3(1, 0, 0.5);\r
const C = new THREE.Vector3(1, 1, 1);\r
const D = new THREE.Vector3(0, 1, 0.5);\r
\r
// Filled quad ABCD (two triangles)\r
const quadGeo = new THREE.BufferGeometry();\r
const verts = new Float32Array([\r
  A.x,A.y,A.z,  B.x,B.y,B.z,  C.x,C.y,C.z,\r
  A.x,A.y,A.z,  C.x,C.y,C.z,  D.x,D.y,D.z\r
]);\r
quadGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));\r
quadGeo.computeVertexNormals();\r
scene.add(new THREE.Mesh(quadGeo, new THREE.MeshStandardMaterial({\r
  color: 0xffe066, side: THREE.DoubleSide,\r
  transparent: true, opacity: 0.55, roughness: 0.4\r
})));\r
\r
// Quad outline\r
const outlinePoints = [A, B, C, D, A];\r
scene.add(new THREE.Line(\r
  new THREE.BufferGeometry().setFromPoints(outlinePoints),\r
  new THREE.LineBasicMaterial({ color: 0xffe066, linewidth: 2 })\r
));\r
\r
// Highlight the two "opposite" edges B and D lie on\r
function edgeLine(p1, p2, color) {\r
  scene.add(new THREE.Line(\r
    new THREE.BufferGeometry().setFromPoints([p1, p2]),\r
    new THREE.LineBasicMaterial({ color, linewidth: 3 })\r
  ));\r
}\r
edgeLine(new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,1), 0x44ddff);\r
edgeLine(new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,1), 0x44ddff);\r
\r
// Spheres at A, B, C, D\r
function dot(pos, color, r=0.04) {\r
  const m = new THREE.Mesh(\r
    new THREE.SphereGeometry(r, 16, 12),\r
    new THREE.MeshStandardMaterial({ color, roughness: 0.3 })\r
  );\r
  m.position.copy(pos);\r
  scene.add(m);\r
}\r
dot(A, 0xff6644, 0.055);\r
dot(C, 0xff6644, 0.055);\r
dot(B, 0x44ddff, 0.045);\r
dot(D, 0x44ddff, 0.045);\r
\r
// Labels\r
function label(text, pos, color='#cce') {\r
  const c = document.createElement('canvas'); c.width=80; c.height=40;\r
  const ctx = c.getContext('2d');\r
  ctx.font = 'bold 24px system-ui'; ctx.fillStyle = color;\r
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';\r
  ctx.fillText(text, 40, 20);\r
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({\r
    map: new THREE.CanvasTexture(c), transparent: true, depthTest: false\r
  }));\r
  sp.scale.set(0.22, 0.11, 1);\r
  sp.position.copy(pos).addScalar(-0.07);\r
  scene.add(sp);\r
}\r
label('A', A.clone().add(new THREE.Vector3(-0.1, -0.1, 0)), '#ff8866');\r
label('B', B.clone().add(new THREE.Vector3( 0.12, -0.08, 0)), '#88eeff');\r
label('C', C.clone().add(new THREE.Vector3( 0.1,  0.1,  0)), '#ff8866');\r
label('D', D.clone().add(new THREE.Vector3(-0.15, 0.06, 0)), '#88eeff');\r
\r
function animate() { requestAnimationFrame(animate); orbit.update(); renderer.render(scene, camera); }\r
animate();\r
\r
window.addEventListener('resize', () => {\r
  camera.aspect = innerWidth/innerHeight;\r
  camera.updateProjectionMatrix();\r
  renderer.setSize(innerWidth, innerHeight);\r
});\r
window.parent.postMessage({ iframeHeight: 480 }, '*');\r
<\/script></body></html>\r
\`\`\``;export{e as default};