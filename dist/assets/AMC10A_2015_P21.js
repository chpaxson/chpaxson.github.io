var e=`<!-- metadata -->\r
2015 AMC10A\r
Problem 21\r
answer = 3\r
\r
\r
# Problem\r
Tetrahedron $ABCD$ has $AB=5$, $AC=3$, $BC=4$, $BD=4$, $AD=3$, and $CD=\\frac{12\\sqrt{2}}{5}$.  What is the volume of the tetrahedron?\r
\r
answers = $3\\sqrt{2}$, $2\\sqrt{5}$, $\\frac{24}{5}$, $3\\sqrt{3}$, $\\frac{24\\sqrt{2}}{5}$\r
\r
# Solution\r
\r
**Key observation:** Triangle $ABC$ has sides $AB=5$, $AC=3$, $BC=4$. Since $3^2+4^2=5^2$, it is a **right triangle with the right angle at $C$**. Likewise, triangle $ABD$ has the same three side lengths, so it is also right-angled at $D$.\r
\r
**Coordinates.** Place $A=(0,0,0)$ and $B=(5,0,0)$. Put $C$ in the $xy$-plane: solving $AC=3$, $BC=4$ gives\r
\r
$$C = \\left(\\frac{9}{5},\\,\\frac{12}{5},\\,0\\right).$$\r
\r
$D$ shares the same $x$-coordinate by the same calculation: $D=\\left(\\frac{9}{5}, y_D, z_D\\right)$ with $y_D^2+z_D^2 = \\frac{144}{25}$. Now use $CD = \\frac{12\\sqrt{2}}{5}$:\r
\r
$$CD^2 = \\left(\\frac{12}{5}-y_D\\right)^2+z_D^2 = \\frac{288}{25}-\\frac{24y_D}{5}+\\frac{144}{25} = \\frac{288}{25}.$$\r
\r
This gives $y_D = 0$, $z_D = \\frac{12}{5}$, so $D = \\left(\\frac{9}{5},\\,0,\\,\\frac{12}{5}\\right)$.\r
\r
**Volume.**\r
\r
$$V = \\frac{1}{6}\\left|\\det\\begin{pmatrix}5&0&0\\\\9/5&12/5&0\\\\9/5&0&12/5\\end{pmatrix}\\right| = \\frac{1}{6}\\cdot 5\\cdot\\frac{144}{25} = \\boxed{\\dfrac{24}{5}}$$\r
\r
The answer is $\\textbf{(C)}$.\r
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
  <b style="color:#ccd">Tetrahedron ABCD</b><br>\r
  <span style="color:#ff6644">●</span> A &nbsp;\r
  <span style="color:#4a9eff">●</span> B &nbsp;\r
  <span style="color:#22cc66">●</span> C &nbsp;\r
  <span style="color:#ffcc44">●</span> D<br>\r
  ∠ACB = ∠ADB = 90°<br>\r
  Volume = <b style="color:#7cf">24/5</b>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// Exact coordinates\r
const A = new THREE.Vector3(0, 0, 0);\r
const B = new THREE.Vector3(5, 0, 0);\r
const C = new THREE.Vector3(9/5, 12/5, 0);\r
const D = new THREE.Vector3(9/5, 0, 12/5);\r
\r
const VERTS = [A, B, C, D];\r
const LABELS = ['A', 'B', 'C', 'D'];\r
const COLORS = [0xff6644, 0x4a9eff, 0x22cc66, 0xffcc44];\r
\r
// Edge pairs and their colors\r
const EDGES = [\r
  [0,1,0xffffff], // AB\r
  [0,2,0xffffff], // AC\r
  [1,2,0xffffff], // BC\r
  [0,3,0xffffff], // AD\r
  [1,3,0xffffff], // BD\r
  [2,3,0xaaaaff], // CD\r
];\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
\r
const center = new THREE.Vector3().addVectors(A,B).add(C).add(D).multiplyScalar(0.25);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 100);\r
camera.position.set(center.x + 5, center.y + 4, center.z + 6);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.copy(center); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.65));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(6, 8, 5); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.4);\r
fill.position.set(-4, 2, -3); scene.add(fill);\r
\r
// Solid faces (transparent)\r
const faceIndices = [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];\r
const faceColors  = [0x3d8ef0, 0x9b6bff, 0x22cc66, 0xffaa33];\r
faceIndices.forEach(([i,j,k], fi) => {\r
  const geo = new THREE.BufferGeometry();\r
  const pos = new Float32Array([\r
    ...VERTS[i].toArray(), ...VERTS[j].toArray(), ...VERTS[k].toArray()\r
  ]);\r
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));\r
  geo.computeVertexNormals();\r
  scene.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color: faceColors[fi], transparent: true, opacity: 0.18,\r
    side: THREE.DoubleSide, roughness: 0.4, depthWrite: false\r
  })));\r
});\r
\r
// Edges\r
EDGES.forEach(([i,j,col]) => {\r
  const geo = new THREE.BufferGeometry().setFromPoints([VERTS[i], VERTS[j]]);\r
  scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: col })));\r
});\r
\r
// Right-angle markers at C (in face ABC) and D (in face ABD)\r
function rightAngleMark(corner, p1, p2, size=0.18) {\r
  const u = p1.clone().sub(corner).normalize().multiplyScalar(size);\r
  const v = p2.clone().sub(corner).normalize().multiplyScalar(size);\r
  const pts = [\r
    corner.clone().add(u),\r
    corner.clone().add(u).add(v),\r
    corner.clone().add(v),\r
  ];\r
  const geo = new THREE.BufferGeometry().setFromPoints(pts);\r
  scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })));\r
}\r
rightAngleMark(C, A, B);\r
rightAngleMark(D, A, B);\r
\r
// Vertex spheres\r
VERTS.forEach((v, i) => {\r
  const m = new THREE.Mesh(\r
    new THREE.SphereGeometry(0.09, 16, 12),\r
    new THREE.MeshStandardMaterial({ color: COLORS[i], roughness: 0.3 })\r
  );\r
  m.position.copy(v);\r
  scene.add(m);\r
});\r
\r
// Edge-length labels via sprites\r
function makeLabel(text, position) {\r
  const canvas = document.createElement('canvas');\r
  canvas.width = 128; canvas.height = 48;\r
  const ctx = canvas.getContext('2d');\r
  ctx.fillStyle = 'rgba(0,0,0,0)';\r
  ctx.fillRect(0,0,128,48);\r
  ctx.font = 'bold 22px system-ui';\r
  ctx.fillStyle = '#ccddff';\r
  ctx.textAlign = 'center';\r
  ctx.textBaseline = 'middle';\r
  ctx.fillText(text, 64, 24);\r
  const tex = new THREE.CanvasTexture(canvas);\r
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });\r
  const sprite = new THREE.Sprite(mat);\r
  sprite.scale.set(0.7, 0.28, 1);\r
  sprite.position.copy(position);\r
  scene.add(sprite);\r
}\r
\r
const edgeLengths = [\r
  [0,1,'5'], [0,2,'3'], [1,2,'4'],\r
  [0,3,'3'], [1,3,'4'], [2,3,'12√2/5']\r
];\r
edgeLengths.forEach(([i,j,lbl]) => {\r
  const mid = VERTS[i].clone().add(VERTS[j]).multiplyScalar(0.5);\r
  mid.addScalar(0.18);\r
  makeLabel(lbl, mid);\r
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
\`\`\`\r
\r
\r
`;export{e as default};