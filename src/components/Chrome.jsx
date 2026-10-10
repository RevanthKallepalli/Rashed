import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, finePointer } from '../lib/motion';
import { waLink } from '../data';
import { WaIcon } from './WhatsApp';

/* ---------- Loader: the bar loads up to 240 kg, then wipes away ---------- */
export function Loader({ onDone }) {
  const root = useRef(null);
  const kg = useRef(null);
  const bar = useRef(null);
  const inner = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) { setGone(true); onDone(); return undefined; }
    document.documentElement.style.overflow = 'hidden';
    const o = { v: 20 };
    const tl = gsap.timeline({
      onComplete: () => { document.documentElement.style.overflow = ''; setGone(true); },
    });
    tl.to(o, { v: 240, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { if (kg.current) kg.current.textContent = Math.round(o.v); } }, 0)
      .to(bar.current, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(inner.current, { y: -40, opacity: 0, duration: 0.4, ease: 'power2.in' })
      .add(onDone, '-=.1')
      .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=.1');
    return () => { tl.kill(); document.documentElement.style.overflow = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div className="loader" ref={root}>
      <div className="loader-inner" ref={inner}>
        <span className="mono" style={{ color: 'var(--bronze-hi)' }}>Loading the bar</span>
        <div className="kg tnum"><span ref={kg}>20</span><small>KG</small></div>
        <div className="bar"><i ref={bar} /></div>
        <span className="mono" style={{ color: 'var(--chalk-3)' }}>Chalk up · brace · lift</span>
      </div>
    </div>
  );
}

/* ---------- Custom cursor (desktop only) ---------- */
export function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return undefined;
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy, raf = 0;
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      dot.current.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor],a,button,input,select,textarea,label,.cert');
      ring.current.classList.toggle('hot', !!t);
      label.current.textContent = t && t.dataset.cursor ? t.dataset.cursor : '';
    };
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      ring.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true"><span ref={label} /></div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}

/* ---------- Top nav + progress bar ---------- */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const prog = useRef(null);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      setSolid(y > 40);
      if (prog.current) prog.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="progress" aria-hidden="true"><i ref={prog} /></div>
      <header className={`nav ${solid ? 'solid' : ''}`}>
        <div className="wrap">
          <a className="logo" href="#top" data-magnet><span className="logo-mark">MR</span><b>Mohd Rashed</b></a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#coach">Coach</a>
            <a href="#programs">Programs</a>
            <a href="#proof">Results</a>
            <a href="#podium">Record</a>
            <a href="#plans">Plans</a>
            <a href="#book">Contact</a>
          </nav>
          <a className="btn sm" href={waLink()} target="_blank" rel="noopener noreferrer" data-magnet><WaIcon /> Book on WhatsApp</a>
        </div>
      </header>
    </>
  );
}

/* ---------- HUD: journey tracker that adds plates as sections pass ---------- */
const HUD_PLATES = [
  { w: 4, h: 26, c: '#b2352b' }, { w: 4, h: 26, c: '#b2352b' }, { w: 4, h: 26, c: '#26457a' },
  { w: 3, h: 20, c: '#c98b42' }, { w: 3, h: 16, c: '#eeece6' }, { w: 2, h: 12, c: '#8f8e88' },
];

export function Hud() {
  const [state, setState] = useState({ set: 0, name: 'Arrival' });
  const [hide, setHide] = useState(false);
  const kgRef = useRef(null);
  const cur = useRef(20);

  useEffect(() => {
    const secs = [...document.querySelectorAll('section[data-set]')];
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const s = e.target;
        const kg = +s.dataset.kg;
        setState({ set: +s.dataset.set, name: s.dataset.name });
        if (prefersReducedMotion()) { kgRef.current.textContent = kg; }
        else {
          const o = { v: cur.current };
          gsap.to(o, { v: kg, duration: 0.8, ease: 'power2.out', onUpdate: () => { if (kgRef.current) kgRef.current.textContent = Math.round(o.v); } });
        }
        cur.current = kg;
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    secs.forEach((s) => io.observe(s));
    const foot = document.querySelector('footer');
    const fio = new IntersectionObserver((es) => setHide(es[0].isIntersecting));
    if (foot) fio.observe(foot);
    return () => { io.disconnect(); fio.disconnect(); };
  }, []);

  const loaded = Math.min(6, Math.ceil((state.set * 6) / 9));
  return (
    <div className={`hud ${hide ? 'hide' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 92 30">
        <rect x="2" y="13.5" width="88" height="3" rx="1.5" fill="#8f8e88" />
        {HUD_PLATES.map((p, i) => (
          <g key={i}>
            <rect className={`plate-s ${i >= loaded ? 'off' : ''}`} x={24 - i * 5 - p.w} y={15 - p.h / 2} width={p.w} height={p.h} rx="1" fill={p.c} />
            <rect className={`plate-s ${i >= loaded ? 'off' : ''}`} x={68 + i * 5} y={15 - p.h / 2} width={p.w} height={p.h} rx="1" fill={p.c} />
          </g>
        ))}
      </svg>
      <div className="hud-txt">
        <span className="mono">{state.set === 0 ? 'Arrival' : `Set ${String(state.set).padStart(2, '0')} / 09`}</span>
        <b>{state.name}</b>
      </div>
      <div className="hud-kg tnum"><span ref={kgRef}>20</span><small>KG</small></div>
    </div>
  );
}
