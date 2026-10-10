import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Split from './Split';
import { CERTS, CERT_FILTERS, GOALS, MEALS, POSES, STATS, WHY, img, waLink } from '../data';
import { WaIcon } from './WhatsApp';
import { gsap, prefersReducedMotion, finePointer } from '../lib/motion';

export function SecHead({ set, title, lede, style }) {
  return (
    <div className="sec-head" style={style}>
      <span className="set mono">{set}</span>
      <Split as="h2" className="h2">{title}</Split>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

const ICONS = {
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
  bar: <path d="M2 12h3M19 12h3M5 8v8M19 8v8M8 6v12M16 6v12M8 12h8" />,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  heart: <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />,
  chat: <><path d="M4 20l1.4-4A8 8 0 1 1 8 18.6z" /><path d="M9 10h6M9 13h4" /></>,
  shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
};

/* ================= 01 COACH ================= */
export function Coach() {
  return (
    <section className="sec" id="coach" data-set="1" data-name="The Coach" data-kg="60">
      <div className="ghost" data-ghost>Warm-up</div>
      <div className="wrap">
        <SecHead set="Set 01 · Warm-up" title={<>Athlete first. <em>Coach</em> <span className="br">always.</span></>} />
        <div className="coach-grid">
          <div className="coach-copy reveal">
            <p className="big">Structured, personalised fitness and nutrition plans that make people <span>stronger, leaner and healthier,</span> whatever their starting point.</p>
            <p>Mohd Rashed trains the way he competes. Every client gets a plan written for their body, schedule and goal, then gets reviewed every week. The same planning that prepares an athlete for stage day goes into a working professional's fat-loss block or a senior client's mobility work.</p>
            <p>Coaching runs online with weekly check-ins, or in person with three to five sessions a week. WhatsApp stays open for quick questions between sessions.</p>
          </div>
          <div className="stats reveal">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="mono">{s.label}</span>
                <b className="tnum">{s.prefix}<span data-count={s.value}>{s.value}</span>{s.suffix && <sup>{s.suffix}</sup>}</b>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="why">
          {WHY.map((w) => (
            <div className="why-item" data-tilt="6" key={w.title}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{ICONS[w.icon]}</svg>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 02 PHYSIQUE ================= */
export function Physique() {
  const [active, setActive] = useState(2);
  const hover = finePointer();
  return (
    <section className="sec physique" id="physique" data-set="2" data-name="The Standard" data-kg="80">
      <div className="ghost" data-ghost>Physique</div>
      <div className="wrap">
        <SecHead set="Set 02 · The standard" title={<>Built on stage. <em>Proven</em> <span className="br">daily.</span></>}
          lede="Contest condition is the clearest proof that a plan works. Select a frame to bring it forward." />
        <div className="poses" id="poses">
          {POSES.map((p, i) => (
            <button key={p.src} type="button" data-cursor="VIEW" className={`pose ${i === active ? 'on' : ''}`}
              onClick={() => setActive(i)} onMouseEnter={hover ? () => setActive(i) : undefined}>
              <img src={img(p.src)} alt={p.alt} loading="lazy" />
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pl"><span className="mono">{p.tag}</span><b>{p.title}</b></span>
            </button>
          ))}
        </div>
        <div className="pose-note mono"><span>Competition condition · 2024–25 season</span><span>Tap or hover a frame</span></div>
      </div>
    </section>
  );
}

/* ================= 03 CREDENTIALS ================= */
export function Credentials() {
  const [filter, setFilter] = useState('all');
  const [flipped, setFlipped] = useState(() => new Set());
  const rack = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (prefersReducedMotion()) return;
    const els = rack.current.querySelectorAll('.cert:not(.dim) .cert-in');
    gsap.fromTo(els, { rotateZ: -90 }, { rotateZ: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.04 });
  }, [filter]);

  const toggle = (i) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const count = (f) => (f === 'all' ? CERTS.length : CERTS.filter((c) => c.cat === f).length);

  return (
    <section className="sec" id="credentials" data-set="3" data-name="Credentials" data-kg="100">
      <div className="ghost" data-ghost>Certified</div>
      <div className="wrap">
        <SecHead set="Set 03 · Load the plates" title={<>Twelve <span className="br">plates</span> <em>on the bar.</em></>}
          lede="Each certification is a plate of expertise. Filter by area, then turn a plate over to see what it means for clients." />
        <div className="filters">
          {CERT_FILTERS.map((f) => (
            <button key={f} type="button" className={`chip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
              {f[0].toUpperCase() + f.slice(1)}<i>{count(f)}</i>
            </button>
          ))}
        </div>
        <div className="rack" id="rack" ref={rack}>
          {CERTS.map((c, i) => {
            const dim = filter !== 'all' && c.cat !== filter;
            return (
              <div key={c.name} tabIndex={0} data-cursor="FLIP" role="button" aria-pressed={flipped.has(i)}
                className={`cert ${dim ? 'dim' : ''} ${flipped.has(i) ? 'flip' : ''}`}
                onClick={() => toggle(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}>
                <div className="cert-in">
                  <div className="face front">
                    <span className="kgmark">{c.kg} KG</span>
                    <div className="ct"><span className="mono">{c.cat}</span><b>{c.name}</b></div>
                  </div>
                  <div className="face back">
                    <div className="ct"><b>{c.name.replace('Cult Fitness Trainer', 'Cult')}</b><span>{c.text}</span></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="cert-tip mono">Hover, tap or tab to a plate to flip it</p>
      </div>
    </section>
  );
}

/* ================= 04 PROGRAMS ================= */
export function Programs() {
  const [gi, setGi] = useState(0);
  const body = useRef(null);
  const ring = useRef(null);
  const first = useRef(true);
  const g = GOALS[gi];

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    if (prefersReducedMotion()) return;
    gsap.timeline()
      .fromTo(body.current, { rotateX: 14, y: 30, opacity: 0 }, { rotateX: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo(body.current.querySelectorAll('li'), { x: -14, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, duration: 0.4 }, '-=.35');
    gsap.to(ring.current, { rotation: '+=60', transformOrigin: '50% 50%', duration: 1, ease: 'power3.out' });
  }, [gi]);

  return (
    <section className="sec programs" id="programs" data-set="4" data-name="The Program" data-kg="140">
      <div className="ghost" data-ghost>Programs</div>
      <div className="wrap">
        <SecHead set="Set 04 · Main set" title={<>Pick the goal. <em>Get the</em> <span className="br">plan.</span></>}
          lede="Online coaching for fat loss, muscle gain and general fitness, plus specialist plans for special populations. Choose a goal to see how it is coached." />
        <div className="prog">
          <div className="goal-list" role="tablist" aria-label="Training goals">
            {GOALS.map((x, i) => (
              <button key={x.k} type="button" role="tab" aria-selected={i === gi} className={`goal ${i === gi ? 'on' : ''}`} onClick={() => setGi(i)}>
                <span><small>{x.t}</small>{x.k}</span>
                <span className="ix">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="goal-panel" role="tabpanel" aria-live="polite">
            <svg className="gp-ring" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="92" fill="none" stroke="#c98b42" strokeOpacity=".35" strokeWidth="1" />
              <circle ref={ring} cx="100" cy="100" r="74" fill="none" stroke="#c98b42" strokeOpacity=".25" strokeWidth="16" strokeDasharray="4 8" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="#c98b42" strokeOpacity=".4" />
            </svg>
            <div className="gp-anim" ref={body}>
              <div className="gp-top">
                <div>
                  <span className="mono">{g.t} · {String(gi + 1).padStart(2, '0')} / {String(GOALS.length).padStart(2, '0')}</span>
                  <h3 className="gp-title">{g.k}</h3>
                </div>
                <div className="gp-mode">{g.tags.map((t, j) => <span key={t} className={`tag ${j === 0 ? 'hot' : ''}`}>{t}</span>)}</div>
              </div>
              <p className="gp-desc">{g.d}</p>
              <div className="gp-cols">
                <div className="gp-box"><span className="mono">What's included</span><ul>{g.inc.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <div className="gp-box"><span className="mono">What it targets</span><ul>{g.focus.map((x) => <li key={x}>{x}</li>)}</ul></div>
              </div>
              <div>
                <a className="btn sm" href={waLink(`Hi Rashed, I'd like to start a ${g.k.toLowerCase()} plan. Please share the details.`)} target="_blank" rel="noopener noreferrer">
                  <WaIcon /> Start {g.k.toLowerCase()} on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 05 NUTRITION ================= */
export function Nutrition() {
  const [picks, setPicks] = useState(() => MEALS.map(() => 0));
  const [swaps, setSwaps] = useState(0);
  const ring = useRef(null);

  const pick = (mi, j) => {
    if (picks[mi] === j) return;
    setPicks((p) => p.map((v, i) => (i === mi ? j : v)));
    setSwaps((s) => s + 1);
    const r = ring.current; r.classList.remove('pulse'); void r.offsetWidth; r.classList.add('pulse');
  };

  return (
    <section className="sec" id="nutrition" data-set="5" data-name="Fuel" data-kg="160">
      <div className="ghost" data-ghost>Nutrition</div>
      <div className="wrap">
        <SecHead set="Set 05 · Fuel" title={<>Swap the meal. <em>Keep the</em> <span className="br">macros.</span></>}
          lede="Every diet plan gives two to three options for each meal. Pick any option and the day's calories and nutrition stay the same, so the food never gets boring and the plan stays on track. Try it below." />
        <div className="nutri">
          <div className="meals">
            {MEALS.map((m, mi) => (
              <div className="meal reveal-s" key={m.n}>
                <div className="meal-h"><b>{m.n}</b><span className="mono">{m.t} · {m.m}</span></div>
                <div className="opts" role="radiogroup" aria-label={`${m.n} options`}>
                  {m.o.map((o, j) => (
                    <button key={o} type="button" role="radio" aria-checked={picks[mi] === j} className={`opt ${picks[mi] === j ? 'on' : ''}`} onClick={() => pick(mi, j)}>
                      <span className="mono">Option {'ABC'[j]}</span>{o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="day" aria-live="polite">
            <span className="mono">Day total · locked</span>
            <div className="ring" id="ring" ref={ring}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#2c3036" strokeWidth="7" />
                <circle id="ringArc" cx="50" cy="50" r="44" fill="none" stroke="#c98b42" strokeWidth="7" strokeLinecap="round" strokeDasharray="276.5" strokeDashoffset="22" />
              </svg>
              <div className="val"><b className="tnum" id="kcal">1,850</b><span>kcal / day</span></div>
            </div>
            <div className="macros">
              <div className="macro"><div><span>Protein</span><span className="tnum">140 g</span></div><i style={{ '--w': '76%', '--c': 'var(--bronze)' }} /></div>
              <div className="macro"><div><span>Carbs</span><span className="tnum">200 g</span></div><i style={{ '--w': '88%', '--c': 'var(--chalk-2)' }} /></div>
              <div className="macro"><div><span>Fats</span><span className="tnum">52 g</span></div><i style={{ '--w': '48%', '--c': 'var(--plate)' }} /></div>
            </div>
            <div><div className="swaps tnum">{swaps}</div><span className="mono" style={{ color: 'var(--chalk-3)' }}>Swaps made · targets unchanged</span></div>
            <p>Example day for illustration. Real plans are calculated for each client's body, goal and food preferences.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
