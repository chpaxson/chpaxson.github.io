var e=`<!-- metadata -->\r
2015 AMC12B\r
Problem 16\r
answer = 3\r
\r
\r
# Problem\r
A regular hexagon with sides of length 6 has an isosceles triangle attached to each side. Each of these triangles has two \r
sides of length 8. The isosceles triangles are folded to make a pyramid with the hexagon as the base of the pyramid. \r
What is the volume of the pyramid?\r
\r
answers = $18$, $162$, $36\\sqrt{21}$, $18\\sqrt{138}$, $54\\sqrt{21}$\r
\r
# Solution\r
\r
**Step 1 — Slant height of each triangular face.**\r
Each isosceles triangle has base 6 and two legs of 8. Its altitude (from the midpoint of the base to the apex) is:\r
$$m = \\sqrt{8^2 - 3^2} = \\sqrt{55}$$\r
\r
When folded up, $m$ becomes the **slant height** of the pyramid — the distance from the midpoint of a base edge to the apex.\r
\r
**Step 2 — Height of the pyramid.**\r
The **inradius** of a regular hexagon with side $s=6$ is $r = s\\frac{\\sqrt{3}}{2} = 3\\sqrt{3}$.\r
\r
By the Pythagorean theorem in the right triangle (inradius, height, slant height):\r
$$H = \\sqrt{m^2 - r^2} = \\sqrt{55 - 27} = \\sqrt{28} = 2\\sqrt{7}$$\r
\r
**Step 3 — Volume.**\r
The area of a regular hexagon with side 6 is:\r
$$A = \\frac{3\\sqrt{3}}{2}s^2 = \\frac{3\\sqrt{3}}{2}(36) = 54\\sqrt{3}$$\r
\r
$$V = \\frac{1}{3}AH = \\frac{1}{3}(54\\sqrt{3})(2\\sqrt{7}) = \\boxed{36\\sqrt{21}}$$\r
\r
The answer is $\\textbf{(C)}$.\r
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
  border-radius:10px;padding:10px 16px;font-size:12px;line-height:2.1;color:#aac\r
}\r
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">Hexagonal Pyramid</b><br>\r
  Side = 6 &nbsp;·&nbsp; Leg = 8<br>\r
  Slant h = √55<br>\r
  H = 2√7 ≈ <b style="color:#7cf">5.29</b><br>\r
  V = 36√21 ≈ <b style="color:#7cf">165.0</b>\r
</div>\r
<div id="ui">\r
  <label>Flat</label>\r
  <input type="range" id="sl" min="0" max="100" value="0"/>\r
  <label>Folded</label>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const S = 6, LEG = 8, N = 6;\r
const inR = S * Math.sqrt(3) / 2;  // 3√3\r
const slant = Math.sqrt(LEG*LEG - (S/2)*(S/2)); // √55\r
const H = Math.sqrt(slant*slant - inR*inR);       // 2√7\r
\r
// Hexagon vertices (flat, in XZ plane)\r
function hexVert(i) {\r
  const a = (Math.PI/3)*i;\r
  return [S*Math.cos(a), 0, S*Math.sin(a)];\r
}\r
\r
// For each face i: base edge goes from hexVert[i] to hexVert[(i+1)%6]\r
// Mid of base edge = inR away from center; triangle apex = beyond that by slant\r
// Flat: triangle apex lies in XZ plane at distance inR + slant from center (along face normal)\r
// Folded: apex rises to (0, H, 0)\r
\r
const FACE_COLORS = [0x3d8ef0, 0x9b6bff, 0x22cc66, 0xff6644, 0xffaa33, 0xff4488];\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 200);\r
camera.position.set(14, 12, 18);\r
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
sun.position.set(10, 18, 12); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.35);\r
fill.position.set(-8, 4, -8); scene.add(fill);\r
\r
// Pre-compute flat and folded apex positions for each face\r
const faceData = [];\r
for (let i = 0; i < N; i++) {\r
  const v0 = hexVert(i);\r
  const v1 = hexVert((i+1)%N);\r
  // midpoint of base edge\r
  const mx = (v0[0]+v1[0])/2, mz = (v0[2]+v1[2])/2;\r
  // outward normal direction (unit vec from center to mid)\r
  const len = Math.sqrt(mx*mx+mz*mz);\r
  const nx = mx/len, nz = mz/len;\r
  // flat apex: out in XZ plane by slant from mid\r
  const flatApex = [mx + nx*slant, 0, mz + nz*slant];\r
  // folded apex: (0, H, 0) for all faces\r
  const foldApex = [0, H, 0];\r
  faceData.push({ v0, v1, flatApex, foldApex });\r
}\r
\r
// Build face meshes\r
const faceMeshes = faceData.map(({v0,v1,flatApex}, i) => {\r
  const geo = new THREE.BufferGeometry();\r
  const pos = new Float32Array(9);\r
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));\r
  geo.setIndex([0,1,2]);\r
  geo.computeVertexNormals();\r
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color: FACE_COLORS[i], side: THREE.DoubleSide,\r
    transparent: true, opacity: 0.72, roughness: 0.35, depthWrite: false\r
  }));\r
  scene.add(mesh);\r
  return mesh;\r
});\r
\r
// Hexagon base (always flat)\r
const baseShape = new THREE.Shape();\r
for (let i=0;i<N;i++) {\r
  const [x,,z] = hexVert(i);\r
  i===0 ? baseShape.moveTo(x,z) : baseShape.lineTo(x,z);\r
}\r
baseShape.closePath();\r
const baseGeo = new THREE.ShapeGeometry(baseShape);\r
// Rotate shape (it's in XY) to XZ plane\r
baseGeo.rotateX(-Math.PI/2);\r
const baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshStandardMaterial({\r
  color: 0x334466, side: THREE.DoubleSide, transparent: true, opacity: 0.35\r
}));\r
scene.add(baseMesh);\r
\r
// Edge lines\r
const edgeLines = [];\r
function makeEdgeLine(col) {\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));\r
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: col }));\r
  scene.add(line);\r
  return line;\r
}\r
const apexLines = faceData.map(() => makeEdgeLine(0xffffff));   // apex → v0\r
const apexLines2 = faceData.map(() => makeEdgeLine(0xffffff));  // apex → v1\r
\r
// Height line (dashed-look: just two points)\r
const heightLine = makeEdgeLine(0xff6644);\r
const inRadLine  = makeEdgeLine(0x66ddaa);\r
\r
// Apex dot\r
const apexDot = new THREE.Mesh(\r
  new THREE.SphereGeometry(0.12, 12, 8),\r
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })\r
);\r
scene.add(apexDot);\r
\r
function lerp3(a, b, t) {\r
  return [a[0]+t*(b[0]-a[0]), a[1]+t*(b[1]-a[1]), a[2]+t*(b[2]-a[2])];\r
}\r
\r
function setLine(line, p1, p2) {\r
  const arr = line.geometry.attributes.position.array;\r
  arr[0]=p1[0]; arr[1]=p1[1]; arr[2]=p1[2];\r
  arr[3]=p2[0]; arr[4]=p2[1]; arr[5]=p2[2];\r
  line.geometry.attributes.position.needsUpdate = true;\r
}\r
\r
function update(t) {\r
  const apexArr = faceData.map(({flatApex, foldApex}) => lerp3(flatApex, foldApex, t));\r
\r
  faceData.forEach(({v0,v1}, i) => {\r
    const ap = apexArr[i];\r
    const pos = faceMeshes[i].geometry.attributes.position.array;\r
    pos[0]=v0[0]; pos[1]=v0[1]; pos[2]=v0[2];\r
    pos[3]=v1[0]; pos[4]=v1[1]; pos[5]=v1[2];\r
    pos[6]=ap[0]; pos[7]=ap[1]; pos[8]=ap[2];\r
    faceMeshes[i].geometry.attributes.position.needsUpdate = true;\r
    faceMeshes[i].geometry.computeVertexNormals();\r
\r
    setLine(apexLines[i],  [v0[0],v0[1],v0[2]], ap);\r
    setLine(apexLines2[i], [v1[0],v1[1],v1[2]], ap);\r
  });\r
\r
  // Height and inradius indicators (shown when mostly folded)\r
  const alpha = Math.max(0, (t - 0.5) * 2);\r
  heightLine.material.opacity = alpha;\r
  inRadLine.material.opacity  = alpha;\r
  heightLine.material.transparent = true;\r
  inRadLine.material.transparent  = true;\r
\r
  // Use face 0 for inradius viz\r
  const [mx,,mz] = [faceData[0].v0[0]/2 + faceData[0].v1[0]/2, 0,\r
                    faceData[0].v0[2]/2 + faceData[0].v1[2]/2];\r
  setLine(heightLine, [0,0,0], [0,H*t,0]);\r
  setLine(inRadLine,  [0,0,0], [mx, 0, mz]);\r
\r
  // Apex dot (average of all face apexes — converges to single point)\r
  const avgApex = apexArr.reduce((s,a)=>[s[0]+a[0],s[1]+a[1],s[2]+a[2]], [0,0,0])\r
    .map(v=>v/N);\r
  apexDot.position.set(...avgApex);\r
}\r
\r
document.getElementById('sl').addEventListener('input', e => update(e.target.value/100));\r
update(0);\r
\r
function animate() { requestAnimationFrame(animate); orbit.update(); renderer.render(scene, camera); }\r
animate();\r
\r
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