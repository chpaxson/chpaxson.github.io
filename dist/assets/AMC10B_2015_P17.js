var e=`<!-- metadata -->\r
2015 AMC10B\r
Problem 17\r
answer = 2\r
\r
\r
# Problem\r
The centers of the faces of the right rectangular prism shown are joined to create an octahedron.  The prism has dimensions $3\\times4\\times5$.  What is the volume of this octahedron?\r
\r
answers = $\\frac{75}{12}$, $10$, $12$, $10\\sqrt{2}$, $15$\r
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
  body { background: #1a1a2e; overflow: hidden; font-family: sans-serif; }\r
  canvas { display: block; }\r
  #labels { position: absolute; top: 0; left: 0; pointer-events: none; }\r
  .edge-label {\r
    position: absolute;\r
    color: #fff;\r
    font-size: 13px;\r
    font-weight: 600;\r
    background: rgba(0,0,0,0.55);\r
    padding: 2px 6px;\r
    border-radius: 4px;\r
    transform: translate(-50%, -50%);\r
    white-space: nowrap;\r
  }\r
  #hint { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);\r
    color: rgba(255,255,255,0.45); font-size: 12px; pointer-events: none; }\r
</style>\r
</head>\r
<body>\r
<div id="labels"></div>\r
<div id="hint">Drag to rotate · Scroll to zoom</div>\r
<script type="importmap">\r
  { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js",\r
                 "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/" } }\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// ── Scene ────────────────────────────────────────────────────────────────────\r
const W = window.innerWidth, H = window.innerHeight;\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setSize(W, H);\r
renderer.setPixelRatio(devicePixelRatio);\r
document.body.appendChild(renderer.domElement);\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x1a1a2e);\r
\r
const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 200);\r
camera.position.set(9, 7, 11);\r
camera.lookAt(0, 0, 0);\r
\r
const controls = new OrbitControls(camera, renderer.domElement);\r
controls.enableDamping = true;\r
\r
scene.add(new THREE.AmbientLight(0xffffff, 0.6));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.9);\r
dl.position.set(8, 12, 8);\r
scene.add(dl);\r
\r
// ── Dimensions ───────────────────────────────────────────────────────────────\r
const W3 = 3, H3 = 4, D3 = 5;   // prism dimensions\r
const hx = W3/2, hy = H3/2, hz = D3/2;\r
\r
// ── Prism (wireframe) ─────────────────────────────────────────────────────────\r
const prismGeo = new THREE.BoxGeometry(W3, H3, D3);\r
const prismEdges = new THREE.EdgesGeometry(prismGeo);\r
const prismMesh = new THREE.LineSegments(\r
  prismEdges,\r
  new THREE.LineBasicMaterial({ color: 0x5588bb, transparent: true, opacity: 0.45 })\r
);\r
scene.add(prismMesh);\r
\r
// Transparent prism faces\r
const prismFaceMesh = new THREE.Mesh(\r
  prismGeo,\r
  new THREE.MeshStandardMaterial({ color: 0x3366aa, transparent: true, opacity: 0.08, side: THREE.DoubleSide })\r
);\r
scene.add(prismFaceMesh);\r
\r
// ── Octahedron vertices = face centers of prism ───────────────────────────────\r
// +x, -x, +y, -y, +z, -z face centers\r
const verts = [\r
  new THREE.Vector3( hx,  0,  0),  // 0  right\r
  new THREE.Vector3(-hx,  0,  0),  // 1  left\r
  new THREE.Vector3(  0, hy,  0),  // 2  top\r
  new THREE.Vector3(  0,-hy,  0),  // 3  bottom\r
  new THREE.Vector3(  0,  0, hz),  // 4  front\r
  new THREE.Vector3(  0,  0,-hz),  // 5  back\r
];\r
\r
// All 12 edges of the octahedron\r
// Each equatorial vertex connects to all 4 "belt" vertices; poles to belt.\r
// The 6-vertex octahedron edges: every vertex connects to every other except its opposite.\r
// Pairs (i,j) where i < j and they are NOT antipodal (0↔1, 2↔3, 4↔5)\r
const octEdges = [];\r
const antipodal = new Set(['0-1','1-0','2-3','3-2','4-5','5-4']);\r
for (let i=0;i<6;i++) for (let j=i+1;j<6;j++) {\r
  if (!antipodal.has(\`\${i}-\${j}\`)) octEdges.push([i,j]);\r
}\r
\r
// Draw octahedron edges (uniform gold)\r
octEdges.forEach(([i,j]) => {\r
  const geo = new THREE.BufferGeometry().setFromPoints([verts[i], verts[j]]);\r
  scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffd700, linewidth: 2 })));\r
});\r
\r
// Octahedron filled faces (semi-transparent)\r
const octPositions = [];\r
// 8 triangular faces — for each octant pick the 3 vertices not in that octant's opposite\r
// Faces of a regular-ish octahedron with vertices ±x,±y,±z:\r
const octFaces = [\r
  [0,2,4],[0,2,5],[0,3,4],[0,3,5],\r
  [1,2,4],[1,2,5],[1,3,4],[1,3,5],\r
];\r
octFaces.forEach(([a,b,c]) => {\r
  octPositions.push(...verts[a].toArray(), ...verts[b].toArray(), ...verts[c].toArray());\r
});\r
const octGeo = new THREE.BufferGeometry();\r
octGeo.setAttribute('position', new THREE.Float32BufferAttribute(octPositions, 3));\r
octGeo.computeVertexNormals();\r
const octMesh = new THREE.Mesh(\r
  octGeo,\r
  new THREE.MeshStandardMaterial({ color: 0xffd700, transparent: true, opacity: 0.18, side: THREE.DoubleSide })\r
);\r
scene.add(octMesh);\r
\r
// Vertex spheres\r
verts.forEach((v,i) => {\r
  const s = new THREE.Mesh(\r
    new THREE.SphereGeometry(0.10, 16, 16),\r
    new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.3 })\r
  );\r
  s.position.copy(v);\r
  scene.add(s);\r
});\r
\r
// ── Dashed lines from each vertex to center + labels ────────────────────────\r
const labelsDiv = document.getElementById('labels');\r
const labelDefs = [];\r
const origin = new THREE.Vector3(0, 0, 0);\r
\r
// One dashed line per unique axis direction (show one of each pair ±x, ±y, ±z)\r
const radiiDefs = [\r
  { v: verts[0], color: 0xe05c5c, text: '3/2' },  // +x\r
  { v: verts[2], color: 0x58d68d, text: '4/2'   },  // +y\r
  { v: verts[4], color: 0x5b9cf6, text: '5/2' },  // +z\r
];\r
\r
// Draw all 6 dashed spokes but only label 3\r
verts.forEach((v) => {\r
  const geo = new THREE.BufferGeometry().setFromPoints([origin, v]);\r
  const mat = new THREE.LineDashedMaterial({\r
    color: 0xffffff, dashSize: 0.18, gapSize: 0.12, transparent: true, opacity: 0.55,\r
    depthTest: false,\r
  });\r
  const line = new THREE.Line(geo, mat);\r
  line.computeLineDistances();\r
  scene.add(line);\r
});\r
\r
// Labels at midpoints of the three representative spokes\r
radiiDefs.forEach(({ v, color, text }) => {\r
  const mid = v.clone().multiplyScalar(0.5);\r
  const el = document.createElement('div');\r
  el.className = 'edge-label';\r
  el.style.color = '#' + color.toString(16).padStart(6,'0');\r
  el.textContent = text;\r
  labelsDiv.appendChild(el);\r
  labelDefs.push({ el, mid });\r
});\r
\r
// ── Prism dimension labels on axes ───────────────────────────────────────────\r
const dimDefs = [\r
  { pos: new THREE.Vector3(0, -hy-0.3, -hz-0.35), text: '3' },\r
  { pos: new THREE.Vector3(-hx-0.4, 0, -hz-0.35), text: '4' },\r
  { pos: new THREE.Vector3(-hx-0.4, -hy-0.3, 0),  text: '5' },\r
];\r
dimDefs.forEach(d => {\r
  const el = document.createElement('div');\r
  el.className = 'edge-label';\r
  el.style.color = '#88aacc';\r
  el.style.fontSize = '11px';\r
  el.textContent = d.text;\r
  labelsDiv.appendChild(el);\r
  labelDefs.push({ el, mid: d.pos });\r
});\r
\r
// ── Project helper ────────────────────────────────────────────────────────────\r
const tmp = new THREE.Vector3();\r
function project(pos) {\r
  tmp.copy(pos).project(camera);\r
  return {\r
    x: ( tmp.x * 0.5 + 0.5) * renderer.domElement.clientWidth,\r
    y: (-tmp.y * 0.5 + 0.5) * renderer.domElement.clientHeight,\r
  };\r
}\r
\r
// ── Animate ───────────────────────────────────────────────────────────────────\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  // Update label positions\r
  labelDefs.forEach(({ el, mid }) => {\r
    const p = project(mid);\r
    el.style.left = p.x + 'px';\r
    el.style.top  = p.y + 'px';\r
  });\r
  renderer.render(scene, camera);\r
}\r
animate();\r
\r
// ── Resize ────────────────────────────────────────────────────────────────────\r
window.addEventListener('resize', () => {\r
  const w = window.innerWidth, h = window.innerHeight;\r
  camera.aspect = w/h;\r
  camera.updateProjectionMatrix();\r
  renderer.setSize(w, h);\r
});\r
\r
// ── iframe height reporting ───────────────────────────────────────────────────\r
window.parent.postMessage({ iframeHeight: 520 }, '*');\r
<\/script>\r
</body>\r
</html>\r
\`\`\`\r
\r
If we split the rectangular prism in half on each axis, we will have 8 "corners" to the prism.  Splitting the octahedron up along the same planes will give us 8 identical right triangular pyramids, with edge \r
lengths half of the rectangle's side lengths.\r
\r
\r
\r
The volume of a pyramid is $\\frac{1}{3} \\cdot B \\cdot h$, where $B$ is base area and $h$ is height.\r
\r
Therefore the volume is\r
$$V=8\\cdot \\frac{1}{3} \\left(\\frac{1}{2} \\cdot \\frac{3}{2}\\cdot\\frac{4}{2}\\cdot\\frac{5}{2}\\right)=\\boxed{10}$$  `;export{e as default};