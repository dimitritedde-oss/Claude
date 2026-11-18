import { useEffect, useRef } from "react";
import * as THREE from "three";

const ORANGE = 0xff5a1e;
const TEAL = 0x10333d;
const CREAM = 0xefe6da;

/* Loads an image into a 3:2 canvas texture. "contain" centers it on white (used for the logo). */
function loadTexture(src, contain) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!contain) {
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        tex.needsUpdate = true;
        resolve(tex);
        return;
      }
      const c = document.createElement("canvas");
      c.width = 1536;
      c.height = 1024;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, c.width, c.height);
      const s = Math.min((c.height * 0.82) / img.height, (c.width * 0.82) / img.width);
      ctx.drawImage(img, (c.width - img.width * s) / 2, (c.height - img.height * s) / 2, img.width * s, img.height * s);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Anello 3D di pannelli curvi con le copertine dei lavori.
 * - rotazione lenta, parallasse col cursore, spinta dallo scroll
 * - si ferma quando non e' visibile o la scheda e' in background
 * - rispetta prefers-reduced-motion in modo reattivo (frame statico)
 * - se WebGL non e' disponibile chiama onUnavailable (l'hero mostra l'anello CSS)
 */
export default function HeroScene({ panels, onUnavailable, labelRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      if (!renderer.getContext()) throw new Error("no webgl context");
    } catch {
      onUnavailable?.();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.className = "block size-full";
    canvas.setAttribute("aria-hidden", "true");
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(TEAL, 0.05);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

    const rig = new THREE.Group();
    const ring = new THREE.Group();
    rig.add(ring);
    scene.add(rig);

    const R = 3.2;
    const H = 2.4;
    const arc = THREE.MathUtils.degToRad(66);
    const n = panels.length;
    const disposables = [];
    const track = (o) => (disposables.push(o), o);

    panels.forEach((p, i) => {
      const phi = (i / n) * Math.PI * 2;
      const geo = track(new THREE.CylinderGeometry(R, R, H, 40, 1, true, phi - arc / 2, arc));
      const mat = track(new THREE.MeshBasicMaterial({ color: 0x1b4854 }));
      ring.add(new THREE.Mesh(geo, mat));
      loadTexture(p.src, p.contain)
        .then((tex) => {
          track(tex);
          mat.map = tex;
          mat.color.setHex(0xffffff);
          mat.needsUpdate = true;
          renderOnce();
        })
        .catch(() => {});
      // inner face, barely visible: gives the ring a sense of volume
      const back = new THREE.Mesh(
        geo,
        track(new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.08, side: THREE.BackSide }))
      );
      ring.add(back);
      // thin orange frame
      const edges = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(geo, 30)),
        track(new THREE.LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.55 }))
      );
      ring.add(edges);
    });

    // two thin light rings above and below the panels
    [-(H / 2 + 0.16), H / 2 + 0.16].forEach((y) => {
      const t = new THREE.Mesh(
        track(new THREE.TorusGeometry(R + 0.12, 0.011, 8, 180)),
        track(new THREE.MeshBasicMaterial({ color: ORANGE }))
      );
      t.rotation.x = Math.PI / 2;
      t.position.y = y;
      ring.add(t);
    });

    // dust
    const N = 240;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = R + 0.5 + Math.random() * 2.2;
      pos[i * 3] = Math.sin(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.cos(a) * r;
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      track(new THREE.PointsMaterial({ color: CREAM, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true }))
    );
    rig.add(dust);

    const state = { px: 0, py: 0, speed: 0.22, targetSpeed: 0.22, scroll: 0, lastIndex: -1 };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let noMotion = mq.matches;
    let visible = true;
    let raf = 0;
    let last = performance.now();

    function resize() {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole ring (diameter ~8 units) inside the frame at any aspect ratio
      camera.position.set(0, 0.9, Math.max(9.2, 11.4 / camera.aspect));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      renderOnce();
    }

    function updateLabel() {
      const step = (Math.PI * 2) / n;
      let idx = Math.round(-ring.rotation.y / step) % n;
      if (idx < 0) idx += n;
      if (idx !== state.lastIndex && labelRef?.current) {
        state.lastIndex = idx;
        labelRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")} · ${panels[idx].name}`;
      }
    }

    function draw() {
      rig.rotation.y += (state.px * 0.32 - rig.rotation.y) * 0.06;
      rig.rotation.x += (state.py * 0.1 - rig.rotation.x) * 0.06;
      renderer.render(scene, camera);
      updateLabel();
    }

    function renderOnce() {
      if (!noMotion) return; // the loop is already drawing
      draw();
    }

    function frame(t) {
      raf = 0;
      if (!visible || document.hidden || noMotion) return;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      state.speed += (state.targetSpeed - state.speed) * 0.06;
      ring.rotation.y -= dt * state.speed + state.scroll * 0.0006;
      state.scroll = 0;
      dust.rotation.y += dt * 0.03;
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || !visible || document.hidden || noMotion) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const onPointer = (e) => {
      state.px = (e.clientX / window.innerWidth - 0.5) * 2;
      state.py = (e.clientY / window.innerHeight - 0.5) * 2;
      if (noMotion) renderOnce();
    };
    let lastY = window.scrollY;
    const onScroll = () => {
      state.scroll += window.scrollY - lastY;
      lastY = window.scrollY;
    };
    const onEnter = () => (state.targetSpeed = 0.05);
    const onLeave = () => (state.targetSpeed = 0.22);
    const onMotion = (e) => {
      noMotion = e.matches;
      if (noMotion) {
        cancelAnimationFrame(raf);
        raf = 0;
        draw();
      } else start();
    };
    const onVis = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : start());

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    mq.addEventListener("change", onMotion);
    mount.addEventListener("pointerenter", onEnter);
    mount.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(mount);

    ring.rotation.y = -0.15;
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMotion);
      mount.removeEventListener("pointerenter", onEnter);
      mount.removeEventListener("pointerleave", onLeave);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
    // panels are static; the scene is created once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
