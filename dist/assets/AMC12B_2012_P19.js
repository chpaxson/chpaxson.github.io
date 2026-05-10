var e=`<!-- metadata -->\r
2012 AMC12B\r
Problem 19\r
answer = 1\r
\r
\r
# Problem\r
A solid cube of side length 1 is removed from each corner of a solid cube of side length 3. How many edges does the \r
remaining solid have?\r
\r
answers = $84$, $12$, $36$, $60$, $20$\r
\r
# Solution\r
\r
Removing a 1×1×1 corner cube from the big cube creates **3 new square faces** (one cut into each of the 3 adjacent faces of the big cube). We count the edges of the final solid in three categories.\r
\r
**Category 1 — Shortened original edges.** The big cube has 12 edges of length 3. Each edge has both endpoints at corners, so both ends are cut by 1 unit, leaving a segment of length 1 in the middle. This gives **12 edges**.\r
\r
**Category 2 — Edges shared between an original face and a cut face.** Each original face of the big cube becomes a 12-sided rectilinear polygon (tracing the "plus-sign" shape left after removing four 1×1 corner squares from a 3×3 face gives 12 boundary segments). Of these 12 edges:\r
- 4 are the shortened original edges (Category 1, shared with adjacent faces)\r
- **8 are new edges** lying along cut faces\r
\r
Total: $6\\text{ faces} \\times 8 = 48$ edges.\r
\r
**Category 3 — Edges between two cut faces at the same corner.** The 3 cut faces at each corner meet pairwise, creating 3 new edges per corner:\r
$$8\\text{ corners}\\times 3 = 24\\text{ edges}$$\r
\r
**Total:**\r
$$12 + 48 + 24 = \\boxed{84}$$\r
\r
The answer is $\\textbf{(A)}\\ 84$.\r
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
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">3×3×3 Cube — Corners Removed</b><br>\r
  <span style="color:#4a9eff">■</span> Remaining solid<br>\r
  <span style="color:#ff6644">━</span> Original edges (12)<br>\r
  <span style="color:#44ffaa">━</span> Cut-face / original-face edges (48)<br>\r
  <span style="color:#ffcc44">━</span> Inter-cut-face edges (24)<br>\r
  Total: 84 edges\r
</div>\r
<div id="ui">\r
  <label>Show corners</label>\r
  <input type="range" id="sl" min="0" max="100" value="100"/>\r
  <label>Hide corners</label>\r
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
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 100);\r
camera.position.set(5.5, 4.5, 5.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(1.5, 1.5, 1.5); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.2);\r
sun.position.set(6, 8, 5); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.35);\r
fill.position.set(-4, 1, -4); scene.add(fill);\r
\r
// Build the CSG-like geometry using THREE.js\r
// We'll represent the solid as the big cube minus 8 corner pieces using a custom geometry.\r
// Strategy: use ConvexHull or manual face approach. Instead, let's build it from faces.\r
\r
// The remaining solid has the following faces:\r
// 6 "original" faces: each is a 12-gon (3x3 square with 4 1x1 corners removed)\r
// 24 "cut" faces: 3 per corner × 8 corners, each a 1x1 square\r
\r
const solidMat = new THREE.MeshStandardMaterial({\r
  color: 0x3355aa, roughness: 0.4, metalness: 0.1,\r
  transparent: true, opacity: 0.72, side: THREE.DoubleSide\r
});\r
\r
// Helper: create a flat polygon geometry from a list of 2D points (in a specific 3D plane)\r
function makeFace(pts3d) {\r
  // pts3d: array of THREE.Vector3, convex or simple polygon\r
  // Triangulate as fan from first vertex\r
  const verts = [];\r
  for (let i = 1; i < pts3d.length - 1; i++) {\r
    verts.push(pts3d[0].x, pts3d[0].y, pts3d[0].z);\r
    verts.push(pts3d[i].x, pts3d[i].y, pts3d[i].z);\r
    verts.push(pts3d[i+1].x, pts3d[i+1].y, pts3d[i+1].z);\r
  }\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));\r
  geo.computeVertexNormals();\r
  return geo;\r
}\r
\r
// 12-gon profile for a 3x3 face with 1x1 corners removed (in 2D, then mapped to 3D)\r
// 2D coords (s=0..3): (1,0),(2,0),(2,1),(3,1),(3,2),(2,2),(2,3),(1,3),(1,2),(0,2),(0,1),(1,1)\r
// but we need to fan-triangulate a non-convex polygon\r
function make12gon(pts3d) {\r
  // Use centroid fan triangulation (works for star-shaped polygons)\r
  const cx = pts3d.reduce((s,p)=>s+p.x,0)/pts3d.length;\r
  const cy = pts3d.reduce((s,p)=>s+p.y,0)/pts3d.length;\r
  const cz = pts3d.reduce((s,p)=>s+p.z,0)/pts3d.length;\r
  const center = new THREE.Vector3(cx,cy,cz);\r
  const verts = [];\r
  for (let i = 0; i < pts3d.length; i++) {\r
    const a = pts3d[i], b = pts3d[(i+1)%pts3d.length];\r
    verts.push(center.x,center.y,center.z, a.x,a.y,a.z, b.x,b.y,b.z);\r
  }\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));\r
  geo.computeVertexNormals();\r
  return geo;\r
}\r
\r
// The 12 vertices of the plus-sign shape in (u,v) for a 3x3 face:\r
const profile2d = [\r
  [1,0],[2,0],[2,1],[3,1],[3,2],[2,2],[2,3],[1,3],[1,2],[0,2],[0,1],[1,1]\r
];\r
\r
// 6 original faces — map (u,v) to 3D based on which face\r
const faces6 = [\r
  // z=0 face: u=x, v=y\r
  (u,v) => new THREE.Vector3(u, v, 0),\r
  // z=3 face: u=x, v=y\r
  (u,v) => new THREE.Vector3(u, v, 3),\r
  // x=0 face: u=z, v=y\r
  (u,v) => new THREE.Vector3(0, v, u),\r
  // x=3 face: u=z, v=y\r
  (u,v) => new THREE.Vector3(3, v, u),\r
  // y=0 face: u=x, v=z\r
  (u,v) => new THREE.Vector3(u, 0, v),\r
  // y=3 face: u=x, v=z\r
  (u,v) => new THREE.Vector3(u, 3, v),\r
];\r
\r
faces6.forEach(mapFn => {\r
  const pts = profile2d.map(([u,v]) => mapFn(u,v));\r
  const geo = make12gon(pts);\r
  scene.add(new THREE.Mesh(geo, solidMat));\r
});\r
\r
// 24 cut faces: 3 per corner (at x=1 or x=2, y=1 or y=2, z=1 or z=2 planes, each 1x1)\r
const cornerMeshes = [];\r
const signs = [0, 3]; // corner coord options\r
const cutMat = new THREE.MeshStandardMaterial({\r
  color: 0x44aacc, roughness: 0.3, metalness: 0.05,\r
  transparent: true, opacity: 0.72, side: THREE.DoubleSide\r
});\r
\r
for (const cx of [0,3]) for (const cy of [0,3]) for (const cz of [0,3]) {\r
  const ix = cx===0 ? 1 : 2; // cut plane x\r
  const iy = cy===0 ? 1 : 2;\r
  const iz = cz===0 ? 1 : 2;\r
  const sx = cx===0 ? 1 : -1; // direction toward interior\r
  const sy = cy===0 ? 1 : -1;\r
  const sz = cz===0 ? 1 : -1;\r
\r
  // x=ix cut face: square at {x=ix, y in [cy,cy+sy], z in [cz,cz+sz]}\r
  const cutFaces = [\r
    [ new THREE.Vector3(ix, cy,    cz),\r
      new THREE.Vector3(ix, cy+sy, cz),\r
      new THREE.Vector3(ix, cy+sy, cz+sz),\r
      new THREE.Vector3(ix, cy,    cz+sz) ],\r
    [ new THREE.Vector3(cx,    iy, cz),\r
      new THREE.Vector3(cx+sx, iy, cz),\r
      new THREE.Vector3(cx+sx, iy, cz+sz),\r
      new THREE.Vector3(cx,    iy, cz+sz) ],\r
    [ new THREE.Vector3(cx,    cy,    iz),\r
      new THREE.Vector3(cx+sx, cy,    iz),\r
      new THREE.Vector3(cx+sx, cy+sy, iz),\r
      new THREE.Vector3(cx,    cy+sy, iz) ],\r
  ];\r
\r
  for (const pts of cutFaces) {\r
    const geo = makeFace(pts);\r
    const m = new THREE.Mesh(geo, cutMat);\r
    scene.add(m);\r
    cornerMeshes.push(m);\r
  }\r
}\r
\r
// Draw edges by type\r
function addEdge(p1, p2, color) {\r
  const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);\r
  scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));\r
}\r
\r
// Category 1: 12 shortened original edges (middle thirds of big cube edges)\r
const bigCubeEdges = [\r
  // 4 along x, at y=0,z=0; y=3,z=0; y=0,z=3; y=3,z=3\r
  [[1,0,0],[2,0,0]], [[1,3,0],[2,3,0]], [[1,0,3],[2,0,3]], [[1,3,3],[2,3,3]],\r
  // 4 along y\r
  [[0,1,0],[0,2,0]], [[3,1,0],[3,2,0]], [[0,1,3],[0,2,3]], [[3,1,3],[3,2,3]],\r
  // 4 along z\r
  [[0,0,1],[0,0,2]], [[3,0,1],[3,0,2]], [[0,3,1],[0,3,2]], [[3,3,1],[3,3,2]],\r
];\r
bigCubeEdges.forEach(([a,b]) => addEdge(\r
  new THREE.Vector3(...a), new THREE.Vector3(...b), 0xff6644\r
));\r
\r
// Category 3: 24 inter-cut-face edges (3 per corner)\r
for (const cx of [0,3]) for (const cy of [0,3]) for (const cz of [0,3]) {\r
  const ix = cx===0?1:2, iy = cy===0?1:2, iz = cz===0?1:2;\r
  const sx = cx===0?1:-1, sy = cy===0?1:-1, sz = cz===0?1:-1;\r
  // x=ix and y=iy: edge along z\r
  addEdge(new THREE.Vector3(ix,iy,cz), new THREE.Vector3(ix,iy,cz+sz), 0xffcc44);\r
  // x=ix and z=iz: edge along y\r
  addEdge(new THREE.Vector3(ix,cy,iz), new THREE.Vector3(ix,cy+sy,iz), 0xffcc44);\r
  // y=iy and z=iz: edge along x\r
  addEdge(new THREE.Vector3(cx,iy,iz), new THREE.Vector3(cx+sx,iy,iz), 0xffcc44);\r
}\r
\r
// Category 2: 48 cut-original edges (drawn on the cut faces boundary with original faces)\r
for (const cx of [0,3]) for (const cy of [0,3]) for (const cz of [0,3]) {\r
  const ix = cx===0?1:2, iy = cy===0?1:2, iz = cz===0?1:2;\r
  const sx = cx===0?1:-1, sy = cy===0?1:-1, sz = cz===0?1:-1;\r
  // x=ix cut face edges on original faces (y=cy and z=cz faces)\r
  addEdge(new THREE.Vector3(ix,cy,cz), new THREE.Vector3(ix,cy+sy,cz), 0x44ffaa); // on z=cz face\r
  addEdge(new THREE.Vector3(ix,cy,cz), new THREE.Vector3(ix,cy,cz+sz), 0x44ffaa); // on y=cy face\r
  // y=iy cut face edges on original faces\r
  addEdge(new THREE.Vector3(cx,iy,cz), new THREE.Vector3(cx+sx,iy,cz), 0x44ffaa); // on z=cz face\r
  addEdge(new THREE.Vector3(cx,iy,cz), new THREE.Vector3(cx,iy,cz+sz), 0x44ffaa); // on x=cx face\r
  // z=iz cut face edges on original faces\r
  addEdge(new THREE.Vector3(cx,cy,iz), new THREE.Vector3(cx+sx,cy,iz), 0x44ffaa); // on y=cy face\r
  addEdge(new THREE.Vector3(cx,cy,iz), new THREE.Vector3(cx,cy+sy,iz), 0x44ffaa); // on x=cx face\r
}\r
\r
// Transparency slider\r
document.getElementById('sl').addEventListener('input', e => {\r
  const t = e.target.value / 100;\r
  solidMat.opacity = 0.1 + t * 0.65;\r
  cutMat.opacity = 0.1 + t * 0.65;\r
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
window.parent.postMessage({ iframeHeight: 480 }, '*');\r
<\/script></body></html>\r
\`\`\`\r
`;export{e as default};