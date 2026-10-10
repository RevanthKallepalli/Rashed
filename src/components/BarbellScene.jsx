import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '../lib/motion';

// Interactive 3D Olympic barbell with chalk dust. Drag to spin; follows the mouse; lifts away on scroll.
export default function BarbellScene({ loaded }) {
  const canvasRef = useRef(null);
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;

  useEffect(() => {
    const canvas = canvasRef.current;
    const RM = prefersReducedMotion();
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return undefined; // no WebGL: the hero still works without the bar
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    cam.position.set(0, 0, 13);

    // Simple studio environment for metal reflections
    const pm = new THREE.PMREMGenerator(renderer);
    const env = new THREE.Scene();
    env.background = new THREE.Color(0x0b0c0e);
    const panel = (c, w, h, x, y, z, ry = 0, rx = 0) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.rotation.y = ry; m.rotation.x = rx; env.add(m);
    };
    panel(0xffffff, 8, 2, 0, 6, -2, 0, Math.PI / 2);
    panel(0xffd7a0, 3, 8, -7, 0, 0, Math.PI / 2);
    panel(0xffffff, 2, 8, 7, 1, 2, -Math.PI / 2);
    panel(0x9a6a35, 12, 3, 0, -5, 0, 0, -Math.PI / 2);
    panel(0xffe9c8, 6, 1, 0, 2, 8, Math.PI);
    const envTex = pm.fromScene(env, 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.HemisphereLight(0xfff1dd, 0x0b0c0e, 1.5));
    const key = new THREE.DirectionalLight(0xffe2b8, 6.5); key.position.set(4, 6, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0xc98b42, 7); rim.position.set(-6, -2, -4); scene.add(rim);
    const pt = new THREE.PointLight(0xecbd78, 6, 20, 0); pt.position.set(0, 0, 5); scene.add(pt);

    const steel = new THREE.MeshStandardMaterial({ color: 0xd6d4cf, metalness: 1, roughness: 0.22 });
    const knurl = new THREE.MeshStandardMaterial({ color: 0x9c9a95, metalness: 1, roughness: 0.55 });
    const bronze = new THREE.MeshStandardMaterial({ color: 0xc98b42, metalness: 1, roughness: 0.28 });
    const red = new THREE.MeshStandardMaterial({ color: 0x9b2a22, metalness: 0.15, roughness: 0.42 });
    const blue = new THREE.MeshStandardMaterial({ color: 0x1f3a6b, metalness: 0.15, roughness: 0.42 });
    const yellow = new THREE.MeshStandardMaterial({ color: 0xc7a23a, metalness: 0.2, roughness: 0.4 });
    const black = new THREE.MeshStandardMaterial({ color: 0x141518, metalness: 0.3, roughness: 0.6 });

    const bar = new THREE.Group();
    const cyl = (r, l, mat, x, seg = 48) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, l, seg), mat);
      m.rotation.z = Math.PI / 2; m.position.x = x; bar.add(m); return m;
    };
    cyl(0.075, 4.4, knurl, 0);
    cyl(0.082, 0.5, steel, -1.1); cyl(0.082, 0.5, steel, 1.1); cyl(0.082, 0.3, steel, 0);
    [-1, 1].forEach((s) => {
      cyl(0.16, 0.08, steel, s * 2.26);
      cyl(0.13, 1.75, steel, s * 3.2);
      cyl(0.14, 0.06, steel, s * 4.06);
    });

    // Bumper plate from a lathe profile
    function plate(R, t, mat, trim) {
      const hub = 0.16, lip = 0.035;
      const p = [
        [hub, -t / 2 - 0.03], [hub + 0.16, -t / 2 - 0.03], [hub + 0.18, -t / 2 + lip], [R - 0.14, -t / 2 + lip],
        [R - 0.06, -t / 2], [R, -t / 2 + 0.03], [R, t / 2 - 0.03], [R - 0.06, t / 2], [R - 0.14, t / 2 - lip],
        [hub + 0.18, t / 2 - lip], [hub + 0.16, t / 2 + 0.03], [hub, t / 2 + 0.03], [hub, -t / 2 - 0.03],
      ].map(([a, b]) => new THREE.Vector2(a, b));
      const g = new THREE.Group();
      g.add(new THREE.Mesh(new THREE.LatheGeometry(p, 96), mat));
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(hub + 0.15, hub + 0.15, t + 0.07, 48, 1, true), steel));
      if (trim) {
        [-1, 1].forEach((s) => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(R - 0.32, 0.018, 8, 96), bronze);
          ring.rotation.x = Math.PI / 2; ring.position.y = s * (t / 2 - lip + 0.005); g.add(ring);
        });
      }
      g.rotation.z = Math.PI / 2;
      return g;
    }
    const stack = [[1.25, 0.26, red, 1], [1.25, 0.26, red, 1], [1.25, 0.22, blue, 1], [1.0, 0.18, yellow, 1], [0.78, 0.13, black, 0], [0.6, 0.1, steel, 0]];
    const plates = [];
    [-1, 1].forEach((s) => {
      let x = 2.34;
      stack.forEach(([R, t, mat, tr]) => {
        const p = plate(R, t, mat, tr);
        x += t / 2 + 0.01;
        p.userData = { tx: s * x, s };
        p.position.x = s * x + (RM ? 0 : s * 5);
        x += t / 2 + 0.01;
        bar.add(p); plates.push(p);
      });
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.16, 40), bronze);
      col.rotation.z = Math.PI / 2; col.position.x = s * (x + 0.09); bar.add(col);
    });
    scene.add(bar);

    // Chalk dust
    const N = 700;
    const pos = new Float32Array(N * 3), spd = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22; pos[i * 3 + 1] = (Math.random() - 0.5) * 12; pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      spd[i] = 0.002 + Math.random() * 0.006;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xf2e6d2, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false });
    scene.add(new THREE.Points(pg, dustMat));

    let mx = 0, my = 0, rotY = -0.35, velY = 0.0025, drag = false, lx = 0, visible = true, raf = 0;
    const base = { x: 1.5, y: -1.45 };
    const size = () => {
      const r = canvas.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      cam.aspect = r.width / Math.max(1, r.height); cam.updateProjectionMatrix();
      const narrow = r.width < 900;
      bar.scale.setScalar(narrow ? 0.62 : 0.86);
      base.x = narrow ? 0 : 1.5; base.y = narrow ? -2.2 : -1.45;
    };
    size();
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    const onDown = (e) => { drag = true; lx = e.clientX; canvas.setPointerCapture(e.pointerId); };
    const onDrag = (e) => { if (!drag) return; const dx = e.clientX - lx; lx = e.clientX; velY = dx * 0.0016; rotY += dx * 0.008; };
    const onUp = () => { drag = false; };
    window.addEventListener('resize', size);
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onDrag);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(canvas);

    const clock = new THREE.Clock();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!drag) { velY += ((RM ? 0 : 0.0022) - velY) * 0.02; rotY += velY; }
      const sp = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      bar.rotation.y = rotY + sp * 1.4;
      bar.rotation.x = 0.32 + my * 0.25 + sp * 0.5;
      bar.rotation.z = -0.12 + mx * 0.12;
      bar.position.x = base.x + mx * 0.4;
      bar.position.y = base.y + Math.sin(t * 1.1) * 0.08 + sp * 3.2 - my * 0.2;
      if (loadedRef.current) plates.forEach((p) => { p.position.x += (p.userData.tx - p.position.x) * 0.08; });
      const a = pg.attributes.position.array;
      for (let i = 0; i < N; i++) {
        a[i * 3 + 1] += spd[i]; a[i * 3] += Math.sin(t * 0.3 + i) * 0.0015;
        if (a[i * 3 + 1] > 6) a[i * 3 + 1] = -6;
      }
      pg.attributes.position.needsUpdate = true;
      pt.position.x = mx * 8; pt.position.y = -my * 5;
      renderer.render(scene, cam);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', size);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onDrag);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
      [steel, knurl, bronze, red, blue, yellow, black, dustMat].forEach((m) => m.dispose());
      envTex.dispose(); pm.dispose(); renderer.dispose();
    };
  }, []);

  return <canvas id="gl" ref={canvasRef} aria-label="3D barbell, drag to spin" />;
}
