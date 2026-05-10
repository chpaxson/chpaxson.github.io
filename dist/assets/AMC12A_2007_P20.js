var e=`<!-- metadata -->\r
2007 AMC12A\r
Problem 20\r
answer = 2\r
\r
\r
# Problem\r
Corners are sliced off a unit cube so that the six faces each become regular octagons.  What is the total volume of the removed tetrahedra?\r
\r
answers = $\\frac{5\\sqrt{2}-7}{3}$, $\\frac{10-7\\sqrt{2}}{3}$, $\\frac{3-2\\sqrt{2}}{3}$, $\\frac{8\\sqrt{2}-11}{3}$, $\\frac{6-4\\sqrt{2}}{3}$\r
\r
\r
# Solution\r
\r
Each face of the unit cube must become a regular octagon. Cutting a corner by distance $a$ along each edge replaces the square corner with a diagonal edge of length $a\\sqrt{2}$, leaving a remaining side of $1 - 2a$. For a regular octagon these must be equal:\r
\r
$$a\\sqrt{2} = 1 - 2a \\implies a(2 + \\sqrt{2}) = 1 \\implies a = \\frac{1}{2+\\sqrt{2}} = \\frac{2-\\sqrt{2}}{2}$$\r
\r
Each of the 8 corners is cut off as a **right-corner tetrahedron** with three mutually perpendicular legs of length $a$. Its volume is $\\tfrac{1}{6}a^3$, so the total removed volume is:\r
\r
$$8 \\cdot \\frac{1}{6}a^3 = \\frac{4}{3}a^3 = \\frac{4}{3}\\cdot\\frac{(2-\\sqrt{2})^3}{8}$$\r
\r
Expanding $(2-\\sqrt{2})^3 = 20 - 14\\sqrt{2}$:\r
\r
$$= \\frac{4}{3}\\cdot\\frac{20-14\\sqrt{2}}{8} = \\frac{20-14\\sqrt{2}}{6} = \\boxed{\\dfrac{10-7\\sqrt{2}}{3}}$$\r
\r
The answer is $\\textbf{(B)}$.\r
\r
\`\`\`interactive-html\r
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style>\r
*{box-sizing:border-box;margin:0;padding:0}\r
body{background:#0d0d1a;overflow:hidden;font-family:system-ui,sans-serif}\r
canvas{display:block}\r
#ui{\r
  position:absolute;bottom:16px;left:50%;transform:translateX(-50%);\r
  background:rgba(10,10,30,.92);border:1px solid rgba(120,140,255,.3);\r
  border-radius:12px;padding:10px 22px;display:flex;align-items:center;gap:14px;min-width:300px\r
}\r
#ui label{color:#99a;font-size:12px;white-space:nowrap}\r
input[type=range]{\r
  flex:1;-webkit-appearance:none;height:4px;border-radius:2px;\r
  background:linear-gradient(to right,#4a9eff,#9b6bff);cursor:pointer;outline:none\r
}\r
input[type=range]::-webkit-slider-thumb{\r
  -webkit-appearance:none;width:16px;height:16px;border-radius:50%;\r
  background:#fff;cursor:pointer;box-shadow:0 0 6px rgba(74,158,255,.7)\r
}\r
#info{\r
  position:absolute;top:12px;left:12px;color:#667;font-size:11px;line-height:1.9\r
}\r
#label{\r
  position:absolute;top:12px;right:12px;color:#aac;font-size:12px;\r
  background:rgba(10,10,30,.8);padding:6px 12px;border-radius:8px;border:1px solid rgba(120,140,255,.2);\r
  text-align:right;line-height:1.8\r
}\r
</style></head><body>\r
<div id="info">Drag to orbit · Scroll to zoom</div>\r
<div id="label" id="vlabel">\r
  Cut size a = 0.000<br>\r
  Volume removed = 0.000\r
</div>\r
<div id="ui">\r
  <label>No cut</label>\r
  <input type="range" id="sl" min="0" max="100" value="0"/>\r
  <label>Regular octagon</label>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const A_MAX = (2 - Math.sqrt(2)) / 2; // ~0.2929\r
\r
// ---- Scene ----\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.01, 100);\r
camera.position.set(2.4, 2.2, 2.4);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0.5, 0.5, 0.5); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.4);\r
sun.position.set(3, 5, 4); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.4);\r
fill.position.set(-3, 1, -2); scene.add(fill);\r
\r
// ---- Cube wireframe (always visible) ----\r
const cubeEdges = new THREE.LineSegments(\r
  new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),\r
  new THREE.LineBasicMaterial({ color: 0x334466, transparent: true, opacity: 0.5 })\r
);\r
cubeEdges.position.set(0.5, 0.5, 0.5);\r
scene.add(cubeEdges);\r
\r
// ---- Helper: make a corner tetrahedron mesh at corner (cx,cy,cz) ----\r
// with cut legs in directions dx,dy,dz (each ±1)\r
function makeCornerTet(cx, cy, cz, dx, dy, dz) {\r
  const geo = new THREE.BufferGeometry();\r
  // 4 vertices: corner + 3 cut points\r
  const pos = new Float32Array(4 * 3);\r
  const setV = (i, x, y, z) => { pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z; };\r
  // will be updated dynamically; init at a=0 (corner only)\r
  setV(0, cx, cy, cz);\r
  setV(1, cx, cy, cz);\r
  setV(2, cx, cy, cz);\r
  setV(3, cx, cy, cz);\r
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));\r
  // 4 faces (outward winding from corner)\r
  geo.setIndex([\r
    0,1,2,  0,2,3,  0,3,1,  1,3,2\r
  ]);\r
  geo.computeVertexNormals();\r
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color: 0xff6644, transparent: true, opacity: 0.82,\r
    side: THREE.DoubleSide, roughness: 0.4, metalness: 0.1\r
  }));\r
  mesh._cx=cx; mesh._cy=cy; mesh._cz=cz;\r
  mesh._dx=dx; mesh._dy=dy; mesh._dz=dz;\r
  mesh._pos = pos;\r
  return mesh;\r
}\r
\r
// 8 corners of the unit cube\r
const corners = [\r
  [0,0,0, +1,+1,+1],\r
  [1,0,0, -1,+1,+1],\r
  [0,1,0, +1,-1,+1],\r
  [1,1,0, -1,-1,+1],\r
  [0,0,1, +1,+1,-1],\r
  [1,0,1, -1,+1,-1],\r
  [0,1,1, +1,-1,-1],\r
  [1,1,1, -1,-1,-1],\r
];\r
const tets = corners.map(c => {\r
  const m = makeCornerTet(...c);\r
  scene.add(m);\r
  return m;\r
});\r
\r
// ---- Main cube face mesh (clipped) — rebuild each frame via CSG-free approach:\r
// Use a convex hull of the 24 cut vertices (or just a clipped box).\r
// Actually simplest: use THREE.BoxGeometry and don't show it — the octagonal face\r
// emerges visually from the remaining gap after removing the tets.\r
// Let's show the remaining solid as a slightly transparent box for context.\r
const solidGeo = new THREE.BoxGeometry(1,1,1);\r
const solidMesh = new THREE.Mesh(solidGeo, new THREE.MeshStandardMaterial({\r
  color: 0x3d8ef0, transparent: true, opacity: 0.22, side: THREE.BackSide,\r
  roughness: 0.3\r
}));\r
solidMesh.position.set(0.5, 0.5, 0.5);\r
scene.add(solidMesh);\r
\r
// ---- Label ----\r
const vlabel = document.getElementById('label');\r
\r
function update(t) {\r
  const a = t * A_MAX;\r
\r
  // Update each tet\r
  tets.forEach(m => {\r
    const { _cx:cx, _cy:cy, _cz:cz, _dx:dx, _dy:dy, _dz:dz, _pos:pos } = m;\r
    const setV = (i,x,y,z) => { pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z; };\r
    setV(0, cx,       cy,       cz      );  // corner\r
    setV(1, cx+dx*a,  cy,       cz      );  // cut along x\r
    setV(2, cx,       cy+dy*a,  cz      );  // cut along y\r
    setV(3, cx,       cy,       cz+dz*a );  // cut along z\r
    m.geometry.attributes.position.needsUpdate = true;\r
    m.geometry.computeVertexNormals();\r
  });\r
\r
  // Label\r
  const vol = (4/3) * Math.pow(a, 3);\r
  vlabel.innerHTML =\r
    \`a = \${a.toFixed(4)}<br>\` +\r
    \`Volume removed = \${vol.toFixed(5)}<br>\` +\r
    (t > 0.98\r
      ? \`<span style="color:#7cf">= (10−7√2)/3 ≈ \${((10-7*Math.sqrt(2))/3).toFixed(5)}</span>\`\r
      : '');\r
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
window.parent.postMessage({ iframeHeight: 520 }, '*');\r
<\/script></body></html>\r
\`\`\`\r
\r
\r
`;export{e as default};