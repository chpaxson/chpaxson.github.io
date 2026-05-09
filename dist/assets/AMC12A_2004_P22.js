var e=`<!-- metadata -->\r
2004 AMC12A\r
Problem 22\r
answer = 2\r
\r
\r
# Problem\r
Three mutually tangent spheres of radius 1  rest on a horizontal plane.  A sphere of radius 2 rests on them.  What is the distance from the plane to the top of the larger sphere?\r
\r
answers = $3+\\frac{\\sqrt{30}}{2}$, $3+\\frac{\\sqrt{69}}{3}$, $3+\\frac{\\sqrt{123}}{4}$, $\\frac{52}{9}$, $3+2\\sqrt{2}$\r
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
  .lbl {\r
    position: absolute;\r
    font-size: 13px;\r
    font-weight: 600;\r
    background: rgba(0,0,0,0.6);\r
    padding: 2px 7px;\r
    border-radius: 4px;\r
    transform: translate(-50%, -50%);\r
    white-space: nowrap;\r
  }\r
  #hint {\r
    position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);\r
    color: rgba(255,255,255,0.4); font-size: 12px; pointer-events: none;\r
  }\r
</style>\r
</head>\r
<body>\r
<div id="labels"></div>\r
<div id="hint">Drag to rotate · Scroll to zoom</div>\r
<script type="importmap">\r
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js",\r
            "three/addons/":"https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/"}}\r
<\/script>\r
<script type="module">\r
import * as THREE from 'three';\r
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';\r
\r
// ── Renderer ─────────────────────────────────────────────────────────────────\r
const renderer = new THREE.WebGLRenderer({ antialias: true });\r
renderer.setSize(window.innerWidth, window.innerHeight);\r
renderer.setPixelRatio(devicePixelRatio);\r
document.body.appendChild(renderer.domElement);\r
\r
const scene = new THREE.Scene();\r
scene.background = new THREE.Color(0x1a1a2e);\r
\r
// Y-up convention (Three.js default): height = Y axis\r
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 200);\r
camera.position.set(8, 10, 8);\r
camera.lookAt(0, 4, 0);\r
\r
const controls = new OrbitControls(camera, renderer.domElement);\r
controls.target.set(0, 4, 0);\r
controls.enableDamping = true;\r
\r
scene.add(new THREE.AmbientLight(0xffffff, 0.6));\r
const sun = new THREE.DirectionalLight(0xffffff, 0.9);\r
sun.position.set(6, 10, 6);\r
scene.add(sun);\r
\r
// ── Key geometry (Y = up) ────────────────────────────────────────────────────\r
const r1 = 1;\r
const r2 = 2;\r
const R = 2 / Math.sqrt(3);                          // circumradius of small-center triangle\r
const smallY = r1;                                    // small sphere centers at y=1\r
const largeY = smallY + Math.sqrt(9 - R * R);        // = 1 + sqrt(23/3)\r
\r
// ── Ground plane ──────────────────────────────────────────────────────────────\r
const planeMesh = new THREE.Mesh(\r
  new THREE.CircleGeometry(5.5, 64),\r
  new THREE.MeshStandardMaterial({ color: 0x2a3a4a, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })\r
);\r
planeMesh.rotation.x = -Math.PI / 2;\r
scene.add(planeMesh);\r
scene.add(new THREE.GridHelper(10, 20, 0x334455, 0x334455));\r
\r
// ── Sphere helper ─────────────────────────────────────────────────────────────\r
function makeSphere(radius, color, x, y, z, opacity = 0.72) {\r
  const mesh = new THREE.Mesh(\r
    new THREE.SphereGeometry(radius, 48, 48),\r
    new THREE.MeshStandardMaterial({ color, transparent: true, opacity, roughness: 0.3, metalness: 0.1 })\r
  );\r
  mesh.position.set(x, y, z);\r
  scene.add(mesh);\r
  return mesh;\r
}\r
\r
// ── Three small spheres ───────────────────────────────────────────────────────\r
const smallCenters = [0, 1, 2].map(i => {\r
  const a = (i * 2 * Math.PI) / 3;\r
  return new THREE.Vector3(R * Math.cos(a), smallY, R * Math.sin(a));\r
});\r
smallCenters.forEach(c => makeSphere(r1, 0x5b9cf6, c.x, c.y, c.z));\r
\r
// ── Large sphere ──────────────────────────────────────────────────────────────\r
const largeCenter = new THREE.Vector3(0, largeY, 0);\r
makeSphere(r2, 0xf39c12, 0, largeY, 0, 0.7);\r
\r
// ── Dashed line ───────────────────────────────────────────────────────────────\r
function dashedLine(a, b, color, opacity = 0.9) {\r
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);\r
  const line = new THREE.Line(geo, new THREE.LineDashedMaterial({\r
    color, dashSize: 0.15, gapSize: 0.1, transparent: true, opacity, depthTest: false,\r
  }));\r
  line.computeLineDistances();\r
  scene.add(line);\r
}\r
\r
const sc0 = smallCenters[0];\r
const sc1 = smallCenters[1];\r
const centroidSmall = new THREE.Vector3(0, smallY, 0);\r
const groundAtSc0   = new THREE.Vector3(sc0.x, 0, sc0.z);\r
const topOfLarge    = new THREE.Vector3(0, largeY + r2, 0);\r
\r
// r1 = 1: ground up to small center\r
dashedLine(groundAtSc0, sc0, 0xe05c5c);\r
// side = 2: between two small centers\r
dashedLine(sc0, sc1, 0x5b9cf6);\r
// circumradius R: centroid to small center (at height smallY)\r
dashedLine(centroidSmall, sc0, 0x58d68d);\r
// center-to-center = 3: large → small[0]\r
dashedLine(largeCenter, sc0, 0xf39c12);\r
// vertical leg: centroid at smallY up to large center\r
dashedLine(centroidSmall, largeCenter, 0xc39bd3);\r
// r2: large center up to top of large sphere\r
dashedLine(largeCenter, topOfLarge, 0xff9ff3);\r
// faint vertical axis\r
dashedLine(new THREE.Vector3(0,0,0), topOfLarge, 0xffffff, 0.2);\r
\r
// ── Labels ────────────────────────────────────────────────────────────────────\r
const labelsDiv = document.getElementById('labels');\r
const labelDefs = [];\r
\r
function addLabel(text, color, pos) {\r
  const el = document.createElement('div');\r
  el.className = 'lbl';\r
  el.style.color = color;\r
  el.textContent = text;\r
  labelsDiv.appendChild(el);\r
  labelDefs.push({ el, pos });\r
}\r
\r
addLabel('r₁ = 1', '#e05c5c',\r
  new THREE.Vector3(sc0.x + 0.35, 0.5, sc0.z));\r
addLabel('2r₁ = 2', '#5b9cf6',\r
  new THREE.Vector3().addVectors(sc0, sc1).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.3, 0)));\r
addLabel('R = 2/√3', '#58d68d',\r
  new THREE.Vector3().addVectors(centroidSmall, sc0).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.3, 0)));\r
addLabel('r₁+r₂ = 3', '#f39c12',\r
  new THREE.Vector3().addVectors(largeCenter, sc0).multiplyScalar(0.5).add(new THREE.Vector3(0.3, 0, 0)));\r
addLabel('√69/3', '#c39bd3',\r
  new THREE.Vector3(0.4, (smallY + largeY) / 2, 0));\r
addLabel('r₂ = 2', '#ff9ff3',\r
  new THREE.Vector3(0.4, largeY + r2 / 2, 0));\r
addLabel('h = 3 + √69/3', '#ffffff',\r
  new THREE.Vector3(0.5, largeY + r2 + 0.35, 0));\r
\r
// ── Project & animate ─────────────────────────────────────────────────────────\r
const tmp = new THREE.Vector3();\r
function project(p) {\r
  tmp.copy(p).project(camera);\r
  return {\r
    x: (tmp.x * 0.5 + 0.5) * renderer.domElement.clientWidth,\r
    y: (-tmp.y * 0.5 + 0.5) * renderer.domElement.clientHeight,\r
  };\r
}\r
\r
function animate() {\r
  requestAnimationFrame(animate);\r
  controls.update();\r
  labelDefs.forEach(({ el, pos }) => {\r
    const p = project(pos);\r
    el.style.left = p.x + 'px';\r
    el.style.top  = p.y + 'px';\r
  });\r
  renderer.render(scene, camera);\r
}\r
animate();\r
\r
window.addEventListener('resize', () => {\r
  camera.aspect = window.innerWidth / window.innerHeight;\r
  camera.updateProjectionMatrix();\r
  renderer.setSize(window.innerWidth, window.innerHeight);\r
});\r
\r
window.parent.postMessage({ iframeHeight: 520 }, '*');\r
<\/script>\r
</body>\r
</html>\r
\`\`\`\r
\r
**Setting up coordinates.** The three unit spheres rest on the plane, so their centers are at height $z = 1$. Since they are mutually tangent, the distance between any two centers is $1 + 1 = 2$, so the centers form an equilateral triangle with side length $2$. The circumradius of this triangle is\r
\r
$$R = \\frac{2}{\\sqrt{3}}$$\r
\r
**Finding the large sphere's center.** By symmetry the large sphere's center is directly above the centroid of the triangle. Its center-to-center distance to each small sphere is $1 + 2 = 3$. Applying the Pythagorean theorem with the horizontal leg $R$ and vertical leg $(h - 1)$:\r
\r
$$R^2 + (h-1)^2 = 3^2 \\implies \\frac{4}{3} + (h-1)^2 = 9 \\implies (h-1)^2 = \\frac{23}{3}$$\r
\r
$$h = 1 + \\sqrt{\\frac{23}{3}} = 1 + \\frac{\\sqrt{69}}{3}$$\r
\r
**Distance from plane to top.** The top of the large sphere is $h + r_2$ above the plane:\r
\r
$$\\text{height} = 1 + \\frac{\\sqrt{69}}{3} + 2 = \\boxed{3 + \\frac{\\sqrt{69}}{3}}$$`;export{e as default};