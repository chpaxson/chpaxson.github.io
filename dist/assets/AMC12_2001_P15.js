var e=`<!-- metadata -->\r
2001 AMC12\r
Problem 15\r
answer = 4\r
\r
\r
# Problem\r
An insect lives on the surface of a regular tetrahedron with edges of length 1. It wishes to travel on the surface of the \r
tetrahedron from the midpoint of one edge to the midpoint of the opposite edge. What is the length of the shortest \r
such trip? (Note: Two edges of a tetrahedron are opposite if they have no common endpoint.)\r
\r
answers = $\\frac{1}{2}$, $\\frac{\\sqrt{2}}{2}$, $\\frac{3}{4}$, $1$, $\\frac{3}{2}$\r
\r
# Solution\r
\r
**Key idea — unfold the surface flat.**\r
\r
Label the vertices $A, B, C, D$. The two opposite edges are $AB$ and $CD$; call their midpoints $M_1$ and $M_2$. Any surface path from $M_1$ to $M_2$ must cross at least two faces (since opposite edges share no face). The shortest two-face path lies in one of four equivalent unfoldings:\r
\r
**Unfolding faces $ABC$ and $ACD$ across their shared edge $AC$:**\r
\r
Place $ABC$ flat with $A=(0,0)$, $B=(1,0)$, $C=\\!\\left(\\tfrac{1}{2},\\tfrac{\\sqrt3}{2}\\right)$.\r
\r
Rotating face $ACD$ about $AC$ into the plane sends $D$ to $D' = \\!\\left(-\\tfrac{1}{2}, \\tfrac{\\sqrt3}{2}\\right)$, forming a rhombus $ABD'C$ (all sides $= 1$).\r
\r
$$M_1 = \\text{mid}(AB) = \\left(\\tfrac{1}{2},0\\right), \\qquad M_2 = \\text{mid}(CD') = \\left(0,\\tfrac{\\sqrt3}{2}\\right)$$\r
\r
The straight-line distance in the flat unfolding is:\r
\r
$$|M_1 M_2| = \\sqrt{\\left(\\tfrac{1}{2}\\right)^2 + \\left(\\tfrac{\\sqrt3}{2}\\right)^2} = \\sqrt{\\tfrac{1}{4}+\\tfrac{3}{4}} = \\boxed{1}$$\r
\r
This straight line crosses $AC$ at its midpoint, confirming it stays within the two faces. By symmetry, all four two-face unfoldings give the same length. Any path through three or more faces (or via a vertex) is strictly longer.\r
\r
The answer is $\\textbf{(D)}\\ 1$.\r
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
<div id="legend" id="leg">\r
  <b style="color:#ccd">Regular Tetrahedron, edge = 1</b><br>\r
  <span style="color:#ffcc44">━</span> Edge AB (start) · M₁ = midpoint<br>\r
  <span style="color:#ff6644">━</span> Edge CD (end) · M₂ = midpoint<br>\r
  <span style="color:#22ff88">━</span> Shortest path, length = <b style="color:#7cf">1</b><br>\r
  <span style="color:#aaa">━</span> Unfolding crease (edge AC)\r
</div>\r
<div id="ui">\r
  <label>3D view</label>\r
  <input type="range" id="sl" min="0" max="100" value="0"/>\r
  <label>Unfolded</label>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// 3D coordinates of regular tetrahedron, edge=1\r
const s3 = Math.sqrt(3), s6 = Math.sqrt(6);\r
const A3 = new THREE.Vector3(0, 0, 0);\r
const B3 = new THREE.Vector3(1, 0, 0);\r
const C3 = new THREE.Vector3(0.5, s3/2, 0);\r
const D3 = new THREE.Vector3(0.5, s3/6, s6/3);\r
\r
// Unfolded coordinates: rhombus in XY plane (z=0)\r
// ABC flat: A=(0,0,0), B=(1,0,0), C=(0.5, √3/2, 0)\r
// ACD unfolded across AC → D'=(-0.5, √3/2, 0)\r
const A2 = new THREE.Vector3(0,       0,       0);\r
const B2 = new THREE.Vector3(1,       0,       0);\r
const C2 = new THREE.Vector3(0.5,   s3/2,     0);\r
const Dp2= new THREE.Vector3(-0.5,  s3/2,     0); // D' unfolded\r
\r
// Lerp between 3D and unfolded positions\r
function lerp(a3, a2, t) {\r
  return new THREE.Vector3(\r
    a3.x + t*(a2.x - a3.x),\r
    a3.y + t*(a2.y - a3.y),\r
    a3.z + t*(a2.z - a3.z)\r
  );\r
}\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 100);\r
camera.position.set(0.5, 1.2, 2.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0.5, 0.4, 0); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(2, 3, 2); scene.add(sun);\r
\r
// Face meshes (ABC and ACD, the two path faces)\r
function makeFaceMesh(color, opacity=0.22) {\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3));\r
  geo.setIndex([0,1,2]);\r
  geo.computeVertexNormals();\r
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color, side: THREE.DoubleSide, transparent: true, opacity,\r
    roughness: 0.4, depthWrite: false\r
  }));\r
}\r
\r
const faceABC = makeFaceMesh(0x3d8ef0, 0.28); scene.add(faceABC);\r
const faceACD = makeFaceMesh(0x9b6bff, 0.28); scene.add(faceACD);\r
const faceABD = makeFaceMesh(0x334466, 0.15); scene.add(faceABD);\r
const faceBCD = makeFaceMesh(0x334466, 0.15); scene.add(faceBCD);\r
\r
function setFace(mesh, p0, p1, p2) {\r
  const arr = mesh.geometry.attributes.position.array;\r
  arr[0]=p0.x;arr[1]=p0.y;arr[2]=p0.z;\r
  arr[3]=p1.x;arr[4]=p1.y;arr[5]=p1.z;\r
  arr[6]=p2.x;arr[7]=p2.y;arr[8]=p2.z;\r
  mesh.geometry.attributes.position.needsUpdate = true;\r
  mesh.geometry.computeVertexNormals();\r
}\r
\r
// Edges\r
function makeLine(col, width=1) {\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));\r
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: col, linewidth: width }));\r
  scene.add(line); return line;\r
}\r
function setLine(line, p1, p2) {\r
  const arr = line.geometry.attributes.position.array;\r
  arr[0]=p1.x;arr[1]=p1.y;arr[2]=p1.z;\r
  arr[3]=p2.x;arr[4]=p2.y;arr[5]=p2.z;\r
  line.geometry.attributes.position.needsUpdate = true;\r
}\r
\r
// All 6 edges\r
const eAB = makeLine(0xffcc44, 2); // opposite edges highlighted\r
const eCD = makeLine(0xff6644, 2);\r
const eAC = makeLine(0xaaaaaa); // crease\r
const eAD = makeLine(0x334488);\r
const eBC = makeLine(0x334488);\r
const eBD = makeLine(0x334488);\r
\r
// Path line (M1 to M2): needs 20 segments for the bent 3D path vs straight unfolded\r
const PATH_N = 40;\r
const pathGeo = new THREE.BufferGeometry();\r
const pathArr = new Float32Array((PATH_N+1)*3);\r
pathGeo.setAttribute('position', new THREE.BufferAttribute(pathArr, 3));\r
const pathIndices = [];\r
for(let i=0;i<PATH_N;i++) pathIndices.push(i,i+1);\r
pathGeo.setIndex(pathIndices);\r
const pathLine = new THREE.LineSegments(pathGeo, new THREE.LineBasicMaterial({ color: 0x22ff88, linewidth: 2 }));\r
scene.add(pathLine);\r
\r
// Vertex dots\r
const dotMat = (col) => new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 });\r
function dot(col, r=0.025) {\r
  const m = new THREE.Mesh(new THREE.SphereGeometry(r,12,8), dotMat(col));\r
  scene.add(m); return m;\r
}\r
const dA=dot(0xffffff), dB=dot(0xffffff), dC=dot(0xffffff), dD=dot(0xaaaaff);\r
const dM1=dot(0xffcc44, 0.04), dM2=dot(0xff6644, 0.04);\r
\r
// Crease midpoint (midpoint of AC, where the path crosses in the unfolding)\r
const dCrease=dot(0xaaaaaa, 0.025);\r
\r
let t = 0;\r
\r
function update(frac) {\r
  t = frac;\r
  // Interpolated positions\r
  const pA = lerp(A3, A2, t), pB = lerp(B3, B2, t);\r
  const pC = lerp(C3, C2, t), pD = lerp(D3, Dp2, t);\r
\r
  // Face geometry\r
  setFace(faceABC, pA, pB, pC);\r
  setFace(faceACD, pA, pC, pD);\r
  // The "other two" faces (ABD and BCD) only exist in 3D; fade them out\r
  const otherOpac = 0.15 * (1 - t);\r
  faceABD.material.opacity = otherOpac;\r
  faceBCD.material.opacity = otherOpac;\r
  if (t < 0.99) {\r
    setFace(faceABD, pA, pB, lerp(D3, D3, t)); // D stays at D3 for these other faces\r
    // Actually: ABD and BCD use the REAL D3 position, not D'\r
    const pD3real = lerp(D3, D3, 0); // always D3\r
    setFace(faceABD, pA, pB, D3);\r
    setFace(faceBCD, pB, pC, D3);\r
  }\r
\r
  // Edges\r
  setLine(eAB, pA, pB);\r
  setLine(eCD, pC, pD);\r
  setLine(eAC, pA, pC);\r
  setLine(eAD, pA, D3);\r
  setLine(eBC, pB, pC);\r
  setLine(eBD, pB, D3);\r
\r
  // M1, M2\r
  const M1 = pA.clone().lerp(pB, 0.5);\r
  const M2 = pC.clone().lerp(pD, 0.5);\r
  dM1.position.copy(M1);\r
  dM2.position.copy(M2);\r
\r
  // Crease point (midpoint of AC)\r
  const crease = pA.clone().lerp(pC, 0.5);\r
  dCrease.position.copy(crease);\r
\r
  // Path: in 3D it bends at the crease point; unfolded it's a straight line\r
  // 3D: M1→crease on face ABC, crease→M2 on face ACD\r
  // Unfolded: straight M1→M2\r
  const M1_3d = A3.clone().lerp(B3, 0.5);\r
  const crease_3d = A3.clone().lerp(C3, 0.5);\r
  const M2_3d = C3.clone().lerp(D3, 0.5);\r
\r
  const M1_2d = A2.clone().lerp(B2, 0.5);\r
  const crease_2d = A2.clone().lerp(C2, 0.5);\r
  const M2_2d = C2.clone().lerp(Dp2, 0.5);\r
\r
  for (let i = 0; i <= PATH_N; i++) {\r
    const s = i / PATH_N;\r
    // Interpolate path in 3D vs 2D\r
    let p3, p2;\r
    if (s <= 0.5) {\r
      const u = s * 2;\r
      p3 = M1_3d.clone().lerp(crease_3d, u);\r
      p2 = M1_2d.clone().lerp(M2_2d, s); // straight in 2D\r
    } else {\r
      const u = (s - 0.5) * 2;\r
      p3 = crease_3d.clone().lerp(M2_3d, u);\r
      p2 = M1_2d.clone().lerp(M2_2d, s);\r
    }\r
    const px = p3.x + t*(p2.x-p3.x);\r
    const py = p3.y + t*(p2.y-p3.y);\r
    const pz = p3.z + t*(p2.z-p3.z);\r
    pathArr[i*3]=px; pathArr[i*3+1]=py; pathArr[i*3+2]=pz;\r
  }\r
  pathGeo.attributes.position.needsUpdate = true;\r
\r
  // Vertex dots\r
  dA.position.copy(pA); dB.position.copy(pB);\r
  dC.position.copy(pC); dD.position.copy(pD);\r
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
window.parent.postMessage({ iframeHeight: 490 }, '*');\r
<\/script></body></html>\r
\`\`\`\r
\r
\r
`;export{e as default};