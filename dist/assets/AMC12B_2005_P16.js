var e=`<!-- metadata -->\r
2005 AMC12B\r
Problem 16\r
answer = 3\r
\r
\r
# Problem\r
Eight spheres of radius 1 are placed in the corners of a cube of side length 2, each tangent to the three faces meeting at \r
its corner. A ninth sphere is placed at the center of the cube. What is the radius of the ninth sphere?\r
\r
answers = $1$, $\\sqrt{2}-1$, $\\sqrt{3}-1$, $\\frac{\\sqrt{3}}{2}$, $2-\\sqrt{2}$\r
\r
# Solution\r
\r
Place the cube with its center at the origin, and the 8 corner sphere centers at $(\\pm 1, \\pm 1, \\pm 1)$. Because each corner sphere (radius 1) is tangent to the three adjacent cube faces, each face is exactly 1 unit from its nearest sphere center, so the cube's faces lie at $x = \\pm 2$, $y = \\pm 2$, $z = \\pm 2$ — a cube of side 4 (equivalently, side 2 measured in sphere-diameter units).\r
\r
**Distance from the cube center to any corner sphere center:**\r
\r
$$d = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}$$\r
\r
**Radius of the ninth sphere.** The ninth sphere sits at the origin and is externally tangent to each of the 8 corner spheres. For two externally tangent spheres, the distance between centers equals the sum of radii:\r
\r
$$r + 1 = \\sqrt{3} \\implies \\boxed{r = \\sqrt{3} - 1}$$\r
\r
The answer is $\\textbf{(C)}\\ \\sqrt{3}-1$.\r
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
  <b style="color:#ccd">Nine-Sphere Cube, radius = 1</b><br>\r
  <span style="color:#4a9eff">●</span> Corner spheres (8)<br>\r
  <span style="color:#ffcc44">●</span> Central sphere, r = √3−1<br>\r
  <span style="color:#ff6644">━</span> Distance = √3<br>\r
  Cube side = 4 (scaled)\r
</div>\r
<div id="ui">\r
  <label>Solid</label>\r
  <input type="range" id="sl" min="0" max="100" value="40"/>\r
  <label>Wireframe</label>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// Work in unit-normalised coords: cube [-1,1]^3, sphere radius = 0.5, center sphere r = (√3-1)/2\r
const S = 1;        // half-side\r
const R = 0.5;      // corner sphere radius (scaled: 1/2 of half-side)\r
const RC = (Math.sqrt(3)-1) * R; // central sphere radius\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x0d0d1a);\r
const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, 0.01, 50);\r
camera.position.set(3.5, 2.8, 3.5);\r
\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setPixelRatio(Math.min(devicePixelRatio,2));\r
renderer.setSize(innerWidth, innerHeight);\r
document.body.prepend(renderer.domElement);\r
\r
const orbit = new OrbitControls(camera, renderer.domElement);\r
orbit.enableDamping = true; orbit.dampingFactor = 0.07;\r
orbit.target.set(0,0,0); orbit.update();\r
\r
scene.add(new THREE.AmbientLight(0x8899cc, 0.55));\r
const sun = new THREE.DirectionalLight(0xffffff, 1.3);\r
sun.position.set(4,6,4); scene.add(sun);\r
const fill = new THREE.DirectionalLight(0x4466ff, 0.4);\r
fill.position.set(-3,1,-3); scene.add(fill);\r
\r
// Cube wireframe\r
const cubeGeo = new THREE.BoxGeometry(2*S,2*S,2*S);\r
const cubeEdges = new THREE.LineSegments(\r
  new THREE.EdgesGeometry(cubeGeo),\r
  new THREE.LineBasicMaterial({ color: 0x2a3a5a, transparent:true, opacity:0.6 })\r
);\r
scene.add(cubeEdges);\r
\r
// Corner sphere positions: all 8 corners (±(S-R), ±(S-R), ±(S-R))\r
const signs = [-1,1];\r
const cornerMeshes = [];\r
for(const sx of signs) for(const sy of signs) for(const sz of signs) {\r
  const pos = new THREE.Vector3(sx*(S-R), sy*(S-R), sz*(S-R));\r
  const mat = new THREE.MeshStandardMaterial({\r
    color: 0x3d8ef0, roughness:0.3, metalness:0.05,\r
    transparent:true, opacity:0.75\r
  });\r
  const m = new THREE.Mesh(new THREE.SphereGeometry(R,32,20), mat);\r
  m.position.copy(pos);\r
  scene.add(m);\r
  cornerMeshes.push(m);\r
}\r
\r
// Central sphere\r
const centerMat = new THREE.MeshStandardMaterial({\r
  color: 0xffcc44, roughness:0.25, metalness:0.1,\r
  transparent:true, opacity:0.9\r
});\r
const centerMesh = new THREE.Mesh(new THREE.SphereGeometry(RC,32,20), centerMat);\r
scene.add(centerMesh);\r
\r
// Distance line from center to one corner sphere center (illustrate √3)\r
const csc = new THREE.Vector3(S-R, S-R, S-R); // closest upper-right-front corner center\r
const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), csc]);\r
const distLine = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color:0xff6644, linewidth:2}));\r
scene.add(distLine);\r
\r
// Label at midpoint of distance line\r
function makeLabel(text, pos, color='#ccddff') {\r
  const c=document.createElement('canvas'); c.width=120; c.height=40;\r
  const ctx=c.getContext('2d');\r
  ctx.font='bold 18px system-ui'; ctx.fillStyle=color;\r
  ctx.textAlign='center'; ctx.textBaseline='middle';\r
  ctx.fillText(text,60,20);\r
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({\r
    map:new THREE.CanvasTexture(c),transparent:true,depthTest:false\r
  }));\r
  sp.scale.set(0.55,0.18,1);\r
  sp.position.copy(pos);\r
  scene.add(sp);\r
}\r
makeLabel('√3', csc.clone().multiplyScalar(0.55).add(new THREE.Vector3(0.15,0.1,0)), '#ff9966');\r
makeLabel('r = √3−1', new THREE.Vector3(0.55, 0.2, 0), '#ffcc44');\r
\r
// Transparency slider\r
document.getElementById('sl').addEventListener('input', e => {\r
  const t = e.target.value / 100;\r
  const op = 0.9 - t * 0.75;\r
  cornerMeshes.forEach(m => m.material.opacity = op);\r
  centerMat.opacity = Math.max(0.15, 0.9 - t * 0.5);\r
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
\r
\r
`;export{e as default};