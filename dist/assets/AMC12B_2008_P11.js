var e=`<!-- metadata -->\r
2008 AMC12B\r
Problem 11\r
answer = 3\r
\r
\r
# Problem\r
A cone-shaped mountain has its apex at the top and its base at sea level. The angle between the slope and the base is \r
45 degrees. A straight tunnel is dug through the mountain, going from sea level to sea level, with the tunnel at its \r
deepest point being 20 miles below the apex. What is the length of the tunnel in miles?\r
\r
answers = $10\\sqrt{2}$, $20\\sqrt{2}$, $40$, $20\\sqrt{5}$, $40\\sqrt{2}$\r
\r
# Solution\r
\r
Since the slope makes a **45°** angle with the base, we have $\\tan 45° = H/R = 1$, so $H = R$.\r
\r
The tunnel is a straight chord of the circular base (both endpoints at sea level). At any point on the chord, the depth below the mountain surface equals the mountain's height at that point, which is greatest at the **center** of the base — where the mountain reaches the full height $H$.\r
\r
For the deepest point of the tunnel to be 20 miles below the apex, the mountain surface directly above it must be at the full apex height $H$. This only happens at the center, so the tunnel must pass **through the center of the base** — i.e., it is a diameter.\r
\r
$$H = 20 \\implies R = 20 \\implies \\text{tunnel length} = 2R = \\boxed{40}$$\r
\r
The answer is $\\textbf{(C)}\\ 40$.\r
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
  border-radius:10px;padding:10px 16px;font-size:12px;line-height:2.1;color:#aac;min-width:180px\r
}\r
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">Cone Mountain</b><br>\r
  H = R = 20 mi<br>\r
  Slope angle = 45°<br>\r
  <span style="color:#ffcc44">━</span> Tunnel length = <b style="color:#ffcc44">40 mi</b><br>\r
  <span style="color:#ff6644">━</span> Height H = 20 mi<br>\r
  <span style="color:#66ddaa">━</span> Radius R = 20 mi\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const H = 20, R = 20, N = 64;\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.1, 500);\r
camera.position.set(48, 38, 52);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0, H/2, 0); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.55));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.4);\r
sun.position.set(30, 50, 40); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.35);\r
fill.position.set(-20, 10, -20); scene.add(fill);\r
\r
// Cone surface (transparent)\r
const coneGeo = new THREE.ConeGeometry(R, H, N, 1, true);\r
const coneMesh = new THREE.Mesh(coneGeo, new THREE.MeshStandardMaterial({\r
  color: 0x3a6ea8, transparent: true, opacity: 0.28, side: THREE.DoubleSide,\r
  roughness: 0.4, metalness: 0.0, depthWrite: false\r
}));\r
coneMesh.position.set(0, H/2, 0);\r
scene.add(coneMesh);\r
\r
// Base disk\r
const baseGeo = new THREE.CircleGeometry(R, N);\r
const baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshStandardMaterial({\r
  color: 0x2255aa, transparent: true, opacity: 0.18, side: THREE.DoubleSide\r
}));\r
baseMesh.rotation.x = -Math.PI/2;\r
scene.add(baseMesh);\r
\r
// Wireframe edges: base circle and slant lines\r
function addLine(pts, color, dashed=false) {\r
  const geo = new THREE.BufferGeometry().setFromPoints(pts);\r
  const mat = dashed\r
    ? new THREE.LineDashedMaterial({ color, dashSize: 1.5, gapSize: 1.2, linewidth: 1 })\r
    : new THREE.LineBasicMaterial({ color });\r
  const line = new THREE.Line(geo, mat);\r
  if (dashed) line.computeLineDistances();\r
  scene.add(line);\r
}\r
\r
// Base circle\r
const circPts = [];\r
for (let i=0; i<=N; i++) {\r
  const a = (i/N)*Math.PI*2;\r
  circPts.push(new THREE.Vector3(R*Math.cos(a), 0, R*Math.sin(a)));\r
}\r
addLine(circPts, 0x334488);\r
\r
// A few slant lines for context\r
for (let i=0; i<8; i++) {\r
  const a = (i/8)*Math.PI*2;\r
  addLine([new THREE.Vector3(R*Math.cos(a),0,R*Math.sin(a)), new THREE.Vector3(0,H,0)], 0x334488);\r
}\r
\r
// Tunnel (diameter along x-axis, gold)\r
addLine([new THREE.Vector3(-R,0,0), new THREE.Vector3(R,0,0)], 0xffcc44);\r
\r
// Height arrow (red vertical line at center)\r
addLine([new THREE.Vector3(0,0,0), new THREE.Vector3(0,H,0)], 0xff6644);\r
\r
// Radius arrow (green horizontal)\r
addLine([new THREE.Vector3(0,0,0), new THREE.Vector3(R,0,0)], 0x66ddaa);\r
\r
// 45° angle arc indicator at base edge\r
const arcPts = [];\r
for (let i=0; i<=20; i++) {\r
  const a = (i/20)*(Math.PI/4);  // 0 to 45°\r
  arcPts.push(new THREE.Vector3(R - 4*Math.cos(a), 4*Math.sin(a), 0));\r
}\r
addLine(arcPts, 0xffffff);\r
\r
// Apex dot\r
const apexDot = new THREE.Mesh(\r
  new THREE.SphereGeometry(0.5, 12, 8),\r
  new THREE.MeshStandardMaterial({ color: 0xff6644, roughness: 0.3 })\r
);\r
apexDot.position.set(0, H, 0);\r
scene.add(apexDot);\r
\r
// Tunnel endpoint dots\r
[-R, R].forEach(x => {\r
  const m = new THREE.Mesh(\r
    new THREE.SphereGeometry(0.55, 12, 8),\r
    new THREE.MeshStandardMaterial({ color: 0xffcc44, roughness: 0.3 })\r
  );\r
  m.position.set(x, 0, 0);\r
  scene.add(m);\r
});\r
\r
// Center dot\r
const cDot = new THREE.Mesh(\r
  new THREE.SphereGeometry(0.4, 12, 8),\r
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })\r
);\r
cDot.position.set(0, 0, 0);\r
scene.add(cDot);\r
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
\`\`\`\r
\r
\r
`;export{e as default};