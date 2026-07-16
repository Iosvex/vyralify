// Hero 3D element — an imported Three.js scene: a glossy, slowly-rotating
// icosahedron in the brand blue, wrapped in a wireframe shell, reacting to
// the pointer. Loaded from a module CDN. If WebGL or the import fails, the
// canvas simply hides and the CSS mockup + glass cards carry the hero.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('hero3d');

if (canvas && !reduce) {
  boot().catch(() => { canvas.style.display = 'none'; });
}

async function boot() {
  const THREE = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
  const host = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7.6);

  // Core solid — brand-blue, glossy.
  const geo = new THREE.IcosahedronGeometry(1.7, 1);
  const core = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: 0x2f6bff, metalness: 0.2, roughness: 0.35, flatShading: true, emissive: 0x1233aa, emissiveIntensity: 0.4 })
  );
  scene.add(core);

  // Wireframe shell for a techy, layered look.
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.35, 1),
    new THREE.MeshBasicMaterial({ color: 0x5fa8ff, wireframe: true, transparent: true, opacity: 0.28 })
  );
  scene.add(shell);

  // Lights — cyan key + white rim over a soft ambient.
  scene.add(new THREE.AmbientLight(0x88a0ff, 0.6));
  const key = new THREE.PointLight(0x5fa8ff, 40, 60); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.PointLight(0xffffff, 25, 60); rim.position.set(-6, -3, 4); scene.add(rim);

  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  size();
  addEventListener('resize', size, { passive: true });

  // Pointer parallax.
  let tx = 0, ty = 0, cx = 0, cy = 0;
  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
  });
  host.addEventListener('pointerleave', () => { tx = 0; ty = 0; });

  const loop = () => {
    core.rotation.y += 0.0035; core.rotation.x += 0.0016;
    shell.rotation.y -= 0.0022; shell.rotation.x += 0.0011;
    cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
    camera.position.x = cx * 2; camera.position.y = -cy * 2;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  loop();
}
