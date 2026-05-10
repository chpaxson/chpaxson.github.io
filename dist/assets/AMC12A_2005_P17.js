var e=`<!-- metadata -->\r
2005 AMC12A\r
Problem 17\r
answer = 4\r
\r
\r
# Problem\r
A solid tetrahedron is sliced off a wooden unit cube by a plane passing through two nonadjacent vertices on one face \r
and one vertex on the opposite face not adjacent to either of the first two vertices. The tetrahedron is discarded and \r
the remaining portion of the cube is placed on a table with the cut surface face down. What is the height of this object?\r
\r
answers = $\\frac{1}{3}$, $\\frac{2\\sqrt{2}}{3}$, $1$, $\\frac{2\\sqrt{3}}{3}$, $\\sqrt{2}$\r
\r
# Solution\r
\r
**Setting up coordinates.** Label the unit cube vertices with $A=(0,0,0)$, $B=(1,0,0)$, $C=(1,1,0)$, $D=(0,1,0)$ on the bottom face and $E=(0,0,1)$, $F=(1,0,1)$, $G=(1,1,1)$, $H=(0,1,1)$ on the top.\r
\r
**Identifying the cut.** The two nonadjacent (diagonal) vertices on the bottom face are $A$ and $C$. The top-face vertex not adjacent to either is $F=(1,0,1)$ (checking: $F$ is adjacent only to $B$, $E$, $G$, none of which are $A$ or $C$).\r
\r
**The cutting plane through $A$, $C$, $F$.**\r
\r
$$\\vec{AC}\\times\\vec{AF} = (1,1,0)\\times(1,0,1) = (1,-1,-1) \\implies \\text{plane: } x - y - z = 0$$\r
\r
Substituting all 8 vertices shows only $B=(1,0,0)$ gives $x-y-z = 1 > 0$. So the tetrahedron cut off has vertices $A$, $B$, $C$, $F$, with three right-angle legs along the cube edges meeting at $B$:\r
\r
$$V_{\\text{tet}} = \\frac{1}{6}(1)(1)(1) = \\frac{1}{6}$$\r
\r
**The cut face $ACF$ is equilateral:**\r
$$|AC|=|AF|=|CF|=\\sqrt{2}$$\r
\r
**Height when resting on the cut face.** The remaining solid rests with the plane $x-y-z=0$ on the table. The height equals the maximum perpendicular distance from this plane to any remaining vertex ($D$, $E$, $G$, $H$):\r
\r
$$\\text{dist}(P, \\text{plane}) = \\frac{|x-y-z|}{\\sqrt{3}}$$\r
\r
| Vertex | $x-y-z$ | Distance |\r
|--------|---------|----------|\r
| $D=(0,1,0)$ | $-1$ | $\\frac{1}{\\sqrt{3}}$ |\r
| $E=(0,0,1)$ | $-1$ | $\\frac{1}{\\sqrt{3}}$ |\r
| $G=(1,1,1)$ | $-1$ | $\\frac{1}{\\sqrt{3}}$ |\r
| $H=(0,1,1)$ | $-2$ | $\\frac{2}{\\sqrt{3}}$ |\r
\r
The highest point is $H$, giving height:\r
\r
$$h = \\frac{2}{\\sqrt{3}} = \\boxed{\\dfrac{2\\sqrt{3}}{3}}$$\r
\r
The answer is $\\textbf{(D)}$.\r
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
  flex:1;-webkit-appearance:none;height:4px;border-radius:2px;width:220px;\r
  background:linear-gradient(to right,#4a9eff,#9b6bff);cursor:pointer;outline:none\r
}\r
input[type=range]::-webkit-slider-thumb{\r
  -webkit-appearance:none;width:16px;height:16px;border-radius:50%;\r
  background:#fff;cursor:pointer;box-shadow:0 0 6px rgba(74,158,255,.7)\r
}\r
#legend{\r
  position:absolute;top:12px;right:12px;\r
  background:rgba(10,10,30,.88);border:1px solid rgba(120,140,255,.25);\r
  border-radius:10px;padding:10px 16px;font-size:12px;line-height:2.2;color:#aac;min-width:200px\r
}\r
</style></head><body>\r
<div id="hint">Drag to orbit · Scroll to zoom</div>\r
<div id="legend">\r
  <b style="color:#ccd">Unit Cube Slice</b><br>\r
  <span style="color:#ff6644">■</span> Removed tetrahedron ABCF<br>\r
  <span style="color:#3d8ef0">■</span> Remaining solid (5/6 cube)<br>\r
  <span style="color:#ffcc44">━</span> Cut face ACF (equilateral, side √2)<br>\r
  <span style="color:#22ff88">━</span> Height to H = 2√3/3 ≈ 1.155\r
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
// Cube vertices\r
const cube = {\r
  A: new THREE.Vector3(0,0,0), B: new THREE.Vector3(1,0,0),\r
  C: new THREE.Vector3(1,1,0), D: new THREE.Vector3(0,1,0),\r
  E: new THREE.Vector3(0,0,1), F: new THREE.Vector3(1,0,1),\r
  G: new THREE.Vector3(1,1,1), H: new THREE.Vector3(0,1,1),\r
};\r
const {A,B,C,D,E,F,G,H} = cube;\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 50);\r
camera.position.set(2.2, 1.8, 2.4);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0.5,0.5,0.5); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(3,5,3); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.35);\r
fill.position.set(-2,1,-2); scene.add(fill);\r
\r
function mesh(verts, color, opacity=0.55) {\r
  const pos = new Float32Array(verts.flatMap(v=>v.toArray()));\r
  const geo = new THREE.BufferGeometry();\r
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));\r
  const n = verts.length;\r
  const idx = [];\r
  for(let i=1;i<n-1;i++) idx.push(0,i,i+1);\r
  geo.setIndex(idx);\r
  geo.computeVertexNormals();\r
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({\r
    color, side: THREE.DoubleSide, transparent: true, opacity,\r
    roughness: 0.35, depthWrite: false\r
  }));\r
}\r
\r
function addLine(pts, color, dashed=false) {\r
  const geo = new THREE.BufferGeometry().setFromPoints(pts);\r
  const mat = dashed\r
    ? new THREE.LineDashedMaterial({color,dashSize:0.04,gapSize:0.04})\r
    : new THREE.LineBasicMaterial({color});\r
  const l = new THREE.Line(geo, mat);\r
  if(dashed) l.computeLineDistances();\r
  scene.add(l); return l;\r
}\r
\r
// ---- Remaining solid (blue) ----\r
// Faces: bottom face minus triangle ABC = quad ACDA (wait, bottom face is square ABCD,\r
// the tetrahedron takes triangle ABC corner. Remaining bottom = triangle ACD.\r
// The remaining solid has faces:\r
// - Bottom remnant: triangle ACD (z=0 face minus the triangle at B)\r
// - Left face: quad ADHE (x=0, full)\r
// - Back face: quad DCGH (y=1, full)\r
// - Top face: quad EFGH (z=1, full)\r
// - Right face x=1: triangle CFG (tetrahedron took BCF, so remaining is CFG)\r
// - Front face y=0: triangle AEF (tetrahedron took ABF, so remaining is AEF)\r
// - Cut face: triangle ACF (shared with tet)\r
\r
const remainGroup = new THREE.Group();\r
remainGroup.add(mesh([A,C,D],                0x3d8ef0, 0.45));  // bottom remnant\r
remainGroup.add(mesh([A,D,H,E],              0x3d8ef0, 0.35));  // left face x=0\r
remainGroup.add(mesh([D,C,G,H],              0x3d8ef0, 0.35));  // back face y=1\r
remainGroup.add(mesh([E,H,G,F],              0x3d8ef0, 0.35));  // top face z=1\r
remainGroup.add(mesh([C,F,G],               0x3d8ef0, 0.35));  // right remnant x=1\r
remainGroup.add(mesh([A,E,F],               0x3d8ef0, 0.35));  // front remnant y=0\r
scene.add(remainGroup);\r
\r
// ---- Removed tetrahedron (red) ----\r
const tetGroup = new THREE.Group();\r
tetGroup.add(mesh([A,B,C], 0xff6644, 0.55));  // bottom z=0\r
tetGroup.add(mesh([A,B,F], 0xff6644, 0.45));  // front y=0\r
tetGroup.add(mesh([B,C,F], 0xff6644, 0.45));  // right x=1\r
// cut face shared:\r
scene.add(tetGroup);\r
\r
// ---- Cut face ACF (gold) ----\r
const cutFace = mesh([A,C,F], 0xffcc44, 0.35);\r
scene.add(cutFace);\r
addLine([A,C,F,A], 0xffcc44);\r
\r
// ---- Cube wireframe ----\r
const cubeEdges = [\r
  [A,B],[B,C],[C,D],[D,A], [E,F],[F,G],[G,H],[H,E],\r
  [A,E],[B,F],[C,G],[D,H]\r
];\r
cubeEdges.forEach(([p,q]) => addLine([p,q], 0x223355));\r
\r
// ---- Vertex labels (canvas sprites) ----\r
function label(text, pos) {\r
  const c=document.createElement('canvas'); c.width=64; c.height=40;\r
  const ctx=c.getContext('2d');\r
  ctx.font='bold 20px system-ui'; ctx.fillStyle='#ccddff';\r
  ctx.textAlign='center'; ctx.textBaseline='middle';\r
  ctx.fillText(text,32,20);\r
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));\r
  sp.scale.set(0.22,0.14,1); sp.position.copy(pos).addScalar(0.06);\r
  scene.add(sp);\r
}\r
Object.entries(cube).forEach(([k,v])=>label(k,v));\r
\r
// ---- Height indicator (H is highest point, green dashed line to plane) ----\r
// Foot of perpendicular from H=(0,1,1) to plane x-y-z=0:\r
// H + t*(1,-1,-1) on plane: (0+t)-(1-t)-(1-t)=0 → t-1+t-1+t=0 → 3t=2 → t=2/3\r
// foot = (2/3, 1/3, 1/3)\r
const foot = new THREE.Vector3(2/3, 1/3, 1/3);\r
const hLine = addLine([H, foot], 0x22ff88, true);\r
const hDot = new THREE.Mesh(\r
  new THREE.SphereGeometry(0.025,10,8),\r
  new THREE.MeshStandardMaterial({color:0x22ff88,roughness:0.3})\r
);\r
hDot.position.copy(foot);\r
scene.add(hDot);\r
label('H (highest)', H);\r
\r
// ---- Separation slider ----\r
// Separate tet upward along the normal direction (1,-1,-1)/√3\r
const norm = new THREE.Vector3(1,-1,-1).normalize();\r
const MAX_SEP = 0.55;\r
\r
document.getElementById('sl').addEventListener('input', e => {\r
  const t = e.target.value / 100;\r
  tetGroup.position.copy(norm.clone().multiplyScalar(t * MAX_SEP));\r
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