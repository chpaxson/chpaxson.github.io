var e=`<!-- metadata -->\r
2004 AMC12B\r
Problem 19\r
answer = 1\r
\r
\r
# Problem\r
A truncated cone has horizontal bases with radii $18$ and $2$.  A sphere is tangent to the top, bottom, and lateral surface of the truncated cone.  What is the radius of the sphere?\r
\r
answers = $6$, $4\\sqrt{5}$, $9$, $10$, $6\\sqrt{3}$\r
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
  html, body { width: 100%; height: 100%; background: #0f0f1a; overflow: hidden; font-family: sans-serif; }\r
  #wrap { display: flex; flex-direction: column; width: 100%; height: 100%; }\r
  .panel { position: relative; flex: 1; min-height: 0; }\r
  canvas { display: block; width: 100% !important; height: 100% !important; }\r
  .ptitle { position: absolute; top: 8px; left: 50%; transform: translateX(-50%);\r
    font-size: 11px; color: rgba(255,255,255,0.45); pointer-events: none; }\r
  #divider { height: 1px; background: rgba(120,140,180,0.3); flex-shrink: 0; }\r
  .lbl { position: absolute; font-size: 12px; font-weight: 600; background: rgba(0,0,0,0.6);\r
    padding: 2px 6px; border-radius: 4px; transform: translate(-50%,-50%); white-space: nowrap; pointer-events: none; }\r
  #hint { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);\r
    font-size: 11px; color: rgba(255,255,255,0.3); pointer-events: none; }\r
</style>\r
</head>\r
<body>\r
<div id="wrap">\r
  <div class="panel" id="p3d">\r
    <div class="ptitle">3D View — drag to rotate</div>\r
    <div id="hint">Drag · Scroll</div>\r
  </div>\r
  <div id="divider"></div>\r
  <div class="panel" id="p2d">\r
    <div class="ptitle">Cross-Section</div>\r
  </div>\r
</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js",\r
            "three/addons/":"https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
const R1 = 18, R2 = 2, r = 6, CH = 12;\r
\r
// ══════════════════════ 3D panel ══════════════════════════════════════════════\r
const p3d = document.getElementById('p3d');\r
const r3 = new THREE.WebGLRenderer({ antialias: true });\r
r3.setPixelRatio(devicePixelRatio);\r
r3.setSize(p3d.clientWidth, p3d.clientHeight);\r
p3d.appendChild(r3.domElement);\r
\r
const s3 = new THREE.Scene();\r
s3.background = new THREE.Color(0x1a1a2e);\r
s3.add(new THREE.AmbientLight(0xffffff, 0.6));\r
const dl = new THREE.DirectionalLight(0xffffff, 0.9);\r
dl.position.set(20, 20, 20); s3.add(dl);\r
\r
const c3 = new THREE.PerspectiveCamera(38, p3d.clientWidth / p3d.clientHeight, 0.1, 500);\r
c3.position.set(38, 22, 32);\r
c3.lookAt(0, 0, 0);\r
\r
const controls = new OrbitControls(c3, r3.domElement);\r
controls.target.set(0, 0, 0);\r
controls.enableDamping = true;\r
\r
// Cone shell — depthWrite:false so the sphere always renders through\r
const coneMat = new THREE.MeshStandardMaterial({\r
  color: 0x3a6090, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false\r
});\r
const coneMesh = new THREE.Mesh(new THREE.CylinderGeometry(R2, R1, CH, 64, 1, true), coneMat);\r
coneMesh.renderOrder = 0;\r
s3.add(coneMesh);\r
s3.add(new THREE.LineSegments(\r
  new THREE.EdgesGeometry(new THREE.CylinderGeometry(R2, R1, CH, 24, 1, false)),\r
  new THREE.LineBasicMaterial({ color: 0x5599cc, transparent: true, opacity: 0.55 })\r
));\r
\r
// Caps\r
[-CH/2, CH/2].forEach((y, i) => {\r
  const cap = new THREE.Mesh(\r
    new THREE.CircleGeometry(i === 0 ? R1 : R2, 64),\r
    new THREE.MeshStandardMaterial({ color: 0x2a5070, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false })\r
  );\r
  cap.rotation.x = -Math.PI / 2;\r
  cap.position.y = y;\r
  cap.renderOrder = 0;\r
  s3.add(cap);\r
});\r
\r
// Inscribed sphere — rendered on top of transparent cone\r
const sphereMesh = new THREE.Mesh(\r
  new THREE.SphereGeometry(r, 48, 48),\r
  new THREE.MeshStandardMaterial({ color: 0xf39c12, transparent: false, opacity: 1.0, roughness: 0.2 })\r
);\r
sphereMesh.renderOrder = 1;\r
s3.add(sphereMesh);\r
\r
// Cutting plane (x=0 → the YZ plane through the axis)\r
const cutPlane = new THREE.Mesh(\r
  new THREE.PlaneGeometry(R1 * 2 + 4, CH + 4),\r
  new THREE.MeshBasicMaterial({ color: 0x88aaff, transparent: true, opacity: 0.07, side: THREE.DoubleSide })\r
);\r
cutPlane.rotation.y = Math.PI / 2;\r
s3.add(cutPlane);\r
\r
// Trapezoid outline on cutting plane (x=0, varies in Y and Z)\r
const trapPts3 = [\r
  new THREE.Vector3(0, -CH/2, -R1),\r
  new THREE.Vector3(0, -CH/2,  R1),\r
  new THREE.Vector3(0,  CH/2,  R2),\r
  new THREE.Vector3(0,  CH/2, -R2),\r
  new THREE.Vector3(0, -CH/2, -R1),\r
];\r
s3.add(new THREE.Line(\r
  new THREE.BufferGeometry().setFromPoints(trapPts3),\r
  new THREE.LineBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.8, depthTest: false })\r
));\r
\r
// Circle outline on cutting plane\r
{\r
  const cpts = [];\r
  for (let i = 0; i <= 96; i++) {\r
    const t = (i / 96) * Math.PI * 2;\r
    cpts.push(new THREE.Vector3(0, r * Math.sin(t), r * Math.cos(t)));\r
  }\r
  s3.add(new THREE.Line(\r
    new THREE.BufferGeometry().setFromPoints(cpts),\r
    new THREE.LineBasicMaterial({ color: 0xffaa33, transparent: true, opacity: 0.9, depthTest: false })\r
  ));\r
}\r
\r
// Grid\r
const grid = new THREE.GridHelper(55, 22, 0x2a3a4a, 0x202d3a);\r
grid.position.y = -CH / 2;\r
s3.add(grid);\r
\r
// ══════════════════════ 2D panel ══════════════════════════════════════════════\r
const p2d = document.getElementById('p2d');\r
const r2 = new THREE.WebGLRenderer({ antialias: true });\r
r2.setPixelRatio(devicePixelRatio);\r
r2.setSize(p2d.clientWidth, p2d.clientHeight);\r
p2d.appendChild(r2.domElement);\r
\r
const s2 = new THREE.Scene();\r
s2.background = new THREE.Color(0x141428);\r
\r
// Ortho camera centred on the trapezoid: x: -22..22, aspect-corrected y\r
const ow = 25, oh = ow * (p2d.clientHeight / p2d.clientWidth);\r
const c2 = new THREE.OrthographicCamera(-ow, ow, oh, -oh, 0.1, 100);\r
c2.position.set(0, 0, 10);\r
c2.lookAt(0, 0, 0);\r
\r
function ln(pts, color, opacity, dashed) {\r
  const geo = new THREE.BufferGeometry().setFromPoints(pts.map(([x,y]) => new THREE.Vector3(x,y,0)));\r
  const mat = dashed\r
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.4, gapSize: 0.2, transparent: true, opacity })\r
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity });\r
  const l = new THREE.Line(geo, mat);\r
  if (dashed) l.computeLineDistances();\r
  s2.add(l);\r
}\r
\r
// Trapezoid (bottom at y=-r, top at y=+r)\r
ln([[-R1,-r],[R1,-r],[R2,r],[-R2,r],[-R1,-r]], 0x5b9cf6, 0.9, false);\r
// Axis of symmetry\r
ln([[0,-10],[0,10]], 0xffffff, 0.12, true);\r
// Inscribed circle\r
{\r
  const cpts = [];\r
  for (let i = 0; i <= 128; i++) { const t = (i/128)*Math.PI*2; cpts.push([r*Math.cos(t), r*Math.sin(t)]); }\r
  ln(cpts, 0xf39c12, 0.9, false);\r
}\r
// r₁ (red) — centre to right bottom\r
ln([[0,-r],[R1,-r]], 0xe05c5c, 0.85, true);\r
// r₂ (green) — centre to right top\r
ln([[0,r],[R2,r]], 0x58d68d, 0.85, true);\r
// r (orange) — centre to bottom\r
ln([[0,0],[0,-r]], 0xf39c12, 0.85, true);\r
// h brace on right\r
ln([[R1+1,-r],[R1+1,r]], 0xc39bd3, 0.8, false);\r
ln([[R1,-r],[R1+2,-r]], 0xc39bd3, 0.4, false);\r
ln([[R2,r],[R1+2,r]], 0xc39bd3, 0.4, false);\r
// slant (right leg) highlighted\r
ln([[R1,-r],[R2,r]], 0xaaaacc, 0.55, false);\r
\r
// Tangency dots\r
[[0,-r],[0,r],[3.6,4.8],[-3.6,4.8]].forEach(([x,y]) => {\r
  const d = new THREE.Mesh(new THREE.CircleGeometry(0.28,20), new THREE.MeshBasicMaterial({color:0xffffff}));\r
  d.position.set(x, y, 0.1); s2.add(d);\r
});\r
// Centre dot\r
const cd = new THREE.Mesh(new THREE.CircleGeometry(0.22,20), new THREE.MeshBasicMaterial({color:0xf39c12}));\r
s2.add(cd);\r
\r
// ── Labels (positioned in 2D world coords, projected to screen) ──────────────\r
const labels = [];\r
function addLbl(text, color, wx, wy) {\r
  const el = document.createElement('div');\r
  el.className = 'lbl'; el.style.color = color; el.textContent = text;\r
  p2d.appendChild(el);\r
  labels.push({ el, pos: new THREE.Vector3(wx, wy, 0) });\r
}\r
addLbl('r₁ = 18', '#e05c5c',  9,   -r-1.3);\r
addLbl('r₂ = 2',  '#58d68d',  1,    r+1.3);\r
addLbl('r = 6',   '#f39c12',  1.2, -r/2);\r
addLbl('h = 12',  '#c39bd3',  R1+3.5, 0);\r
addLbl('leg = 20','#aaaacc',  12,   1.5);\r
\r
const tmp2 = new THREE.Vector3();\r
function proj2(pos) {\r
  tmp2.copy(pos).project(c2);\r
  return {\r
    x: (tmp2.x+1)/2 * p2d.clientWidth,\r
    y: (1-(tmp2.y+1)/2) * p2d.clientHeight,\r
  };\r
}\r
\r
// ── Animate ───────────────────────────────────────────────────────────────────\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  r3.render(s3, c3);\r
  r2.render(s2, c2);\r
  labels.forEach(({ el, pos }) => {\r
    const p = proj2(pos);\r
    el.style.left = p.x + 'px';\r
    el.style.top  = p.y + 'px';\r
  });\r
}\r
animate();\r
\r
// ── Resize ────────────────────────────────────────────────────────────────────\r
window.addEventListener('resize', () => {\r
  r3.setSize(p3d.clientWidth, p3d.clientHeight);\r
  c3.aspect = p3d.clientWidth / p3d.clientHeight;\r
  c3.updateProjectionMatrix();\r
\r
  const noh = ow * (p2d.clientHeight / p2d.clientWidth);\r
  r2.setSize(p2d.clientWidth, p2d.clientHeight);\r
  c2.top = noh; c2.bottom = -noh;\r
  c2.updateProjectionMatrix();\r
});\r
\r
window.parent.postMessage({ iframeHeight: 720 }, '*');\r
<\/script>\r
</body>\r
</html>\r
\`\`\`\r
\r
If we take a cross-section from the side, we will see an isosceles trapezoid with bottom $2R_1 = 36$, top $2R_2 = 4$, and an inscribed circle of radius $r$.\r
\r
**Finding the height.** Since the sphere is tangent to both the top and bottom bases, its diameter equals the cone's height:\r
$$h = 2r$$\r
\r
**Tangential condition.** A circle can be inscribed in a trapezoid if and only if the sum of opposite sides are equal:\r
$$\\text{bottom} + \\text{top} = 2 \\times \\text{leg}$$\r
$$36 + 4 = 2\\,\\ell \\implies \\ell = 20$$\r
\r
**Using the Pythagorean theorem** on the right triangle formed by the slant leg, the height, and the difference in radii:\r
$$\\ell^2 = (R_1 - R_2)^2 + h^2$$\r
$$400 = (18-2)^2 + (2r)^2 = 256 + 4r^2$$\r
$$4r^2 = 144 \\implies r = \\boxed{6}$$`;export{e as default};