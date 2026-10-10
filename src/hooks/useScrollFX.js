import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

const q = (s, r = document) => [...r.querySelectorAll(s)];

// All scroll-driven transitions between sections. Runs once the loader has finished.
export default function useScrollFX(ready) {
  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      // Hero lifts away
      gsap.to('.hero .wrap', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

      // Letter-by-letter headings (hero handles its own)
      q('.split').forEach((el) => {
        if (el.closest('.hero')) return;
        gsap.from(q('.c', el), { yPercent: 110, rotate: 4, duration: 1, ease: 'power4.out', stagger: 0.02, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      q('.set').forEach((el) => gsap.from(el, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      q('.lede').forEach((el) => gsap.from(el, { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      q('.reveal').forEach((el) => gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));

      // Cards rise in with a 3D tip
      ['.why-item', '.reveal-s', '.pcard', '.ct-row', '.goal'].forEach((sel) => {
        gsap.set(sel, { y: 50, opacity: 0, rotateX: -18, transformPerspective: 800 });
        ScrollTrigger.batch(sel, {
          start: 'top 90%',
          onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true, clearProps: 'transform' }),
        });
      });

      // Giant outline words drift sideways
      q('[data-ghost]').forEach((el) => gsap.fromTo(el, { xPercent: 12 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

      // Counters
      q('[data-count]').forEach((el) => {
        const n = +el.dataset.count; const o = { v: 0 };
        gsap.to(o, { v: n, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); }, scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      // Physique frames
      gsap.from('.pose', { yPercent: 30, opacity: 0, rotateY: -25, transformPerspective: 1000, stagger: 0.09, duration: 1.1, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: '#poses', start: 'top 80%' } });

      // Certification plates roll onto the rack
      gsap.from('.cert', { x: -140, rotation: -360, opacity: 0, stagger: 0.06, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '#rack', start: 'top 82%' } });

      // Program panel swings in
      gsap.from('.goal-panel', { rotateY: -20, x: 60, opacity: 0, transformPerspective: 1400, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.goal-panel', start: 'top 82%' } });

      // Calorie ring draws
      gsap.fromTo('#ringArc', { strokeDashoffset: 276.5 }, { strokeDashoffset: 22, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: '#ring', start: 'top 85%' } });
      const k = { v: 0 }; const kcal = document.getElementById('kcal');
      gsap.to(k, { v: 1850, duration: 1.8, ease: 'power3.out', onUpdate: () => { kcal.textContent = Math.round(k.v).toLocaleString('en-IN'); }, scrollTrigger: { trigger: '#ring', start: 'top 85%' } });

      // Check-in chart
      const chart = { trigger: '.ci-chart', start: 'top 85%' };
      gsap.fromTo('#ciLine', { strokeDashoffset: 520 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', scrollTrigger: chart });
      gsap.from('#ciArea', { opacity: 0, duration: 1.2, delay: 0.8, scrollTrigger: chart });
      gsap.from('#ciDot', { scale: 0, transformOrigin: '50% 50%', duration: 0.6, delay: 1.4, ease: 'back.out(3)', scrollTrigger: chart });
      const w = { v: 75 }; const ciKg = document.getElementById('ciKg');
      gsap.fromTo(w, { v: 75 }, { v: 70.4, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { ciKg.textContent = w.v.toFixed(1); }, scrollTrigger: chart });

      // Personal training panel wipes open
      gsap.from('.pt', { clipPath: 'inset(0 0 100% 0 round 28px)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: '.pt', start: 'top 85%' } });

      // Final heading grows into place
      gsap.from('.book-h', { scale: 0.85, transformOrigin: '0% 50%', ease: 'none', scrollTrigger: { trigger: '#book', start: 'top bottom', end: 'top 30%', scrub: true } });

      // Each section's top corners round off as it slides in
      q('section.sec, section.podium').forEach((s) => {
        gsap.from(s, { borderTopLeftRadius: '48px', borderTopRightRadius: '48px', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 40%', scrub: true } });
      });

      // Competition record: horizontal pinned scroll on desktop
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const tr = document.getElementById('podTrack');
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth + 40);
        const tw = gsap.to(tr, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#podPin', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
        q('.yr').forEach((y) => gsap.from(q('li', y), { x: 40, opacity: 0, stagger: 0.06, duration: 0.5, scrollTrigger: { trigger: y, containerAnimation: tw, start: 'left 85%' } }));
      });
      mm.add('(max-width: 899px)', () => {
        gsap.set('.yr', { y: 50, opacity: 0 });
        ScrollTrigger.batch('.yr', { start: 'top 90%', onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, overwrite: true }) });
      });
    }, document.body);

    // Images and fonts change heights after load; recompute trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener('load', refresh); ctx.revert(); };
  }, [ready]);
}
