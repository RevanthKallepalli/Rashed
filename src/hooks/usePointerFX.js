import { useEffect } from 'react';
import { finePointer, prefersReducedMotion } from '../lib/motion';

// 3D tilt on [data-tilt] cards and a magnetic pull on [data-magnet] buttons (mouse only).
export default function usePointerFX(ready) {
  useEffect(() => {
    if (!ready || !finePointer() || prefersReducedMotion()) return undefined;
    const off = [];
    const on = (el, ev, fn) => { el.addEventListener(ev, fn); off.push(() => el.removeEventListener(ev, fn)); };

    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const max = +el.dataset.tilt || 8;
      on(el, 'mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
        el.style.setProperty('--gx', `${x * 100}%`);
        el.style.setProperty('--gy', `${y * 100}%`);
      });
      on(el, 'mouseleave', () => {
        el.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 700);
      });
    });

    document.querySelectorAll('[data-magnet]').forEach((el) => {
      on(el, 'mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      on(el, 'mouseleave', () => { el.style.transform = ''; });
    });

    return () => off.forEach((f) => f());
  }, [ready]);
}
