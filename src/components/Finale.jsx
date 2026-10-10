import { useEffect, useMemo, useRef, useState } from 'react';
import { SecHead } from './Journey';
import Split from './Split';
import {
  CONTACT, GOALS, ONLINE_PLANS, PLAN_OPTIONS, PT_DAYS, RECORD, TRANSFORMATIONS, img, ptPlan, waLink,
} from '../data';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import { WaIcon } from './WhatsApp';


/* ---------- Before / after slider ---------- */
function BeforeAfter({ t, index }) {
  const [p, setP] = useState(50);
  const box = useRef(null);

  // One-time sweep to show the slider is draggable
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const o = { v: 50 };
    const st = ScrollTrigger.create({
      trigger: box.current, start: 'top 80%', once: true,
      onEnter: () => {
        gsap.timeline({ delay: 0.3 + index * 0.15 })
          .to(o, { v: 88, duration: 0.7, ease: 'power2.inOut', onUpdate: () => setP(o.v) })
          .to(o, { v: 14, duration: 0.9, ease: 'power2.inOut', onUpdate: () => setP(o.v) })
          .to(o, { v: 50, duration: 0.7, ease: 'power2.inOut', onUpdate: () => setP(o.v) });
      },
    });
    return () => st.kill();
  }, [index]);

  return (
    <div className="ba reveal-s">
      <div className="ba-box" ref={box} style={{ '--p': `${p}%` }} data-cursor="DRAG">
        <img src={img(t.after)} alt={`Client after: ${t.h}`} loading="lazy" />
        <img className="before" src={img(t.before)} alt={`Client before: ${t.h}`} loading="lazy" />
        <span className="lb l">Before</span><span className="lb r">After</span>
        <span className="handle" />
        <input type="range" min="0" max="100" value={Math.round(p)} onChange={(e) => setP(+e.target.value)} aria-label={`Compare before and after, ${t.h}`} />
      </div>
      <h3>{t.h}</h3>
      <p>{t.p}</p>
    </div>
  );
}

/* ================= 06 PROOF ================= */
export function Proof() {
  return (
    <section className="sec proof" id="proof" data-set="6" data-name="The Proof" data-kg="180">
      <div className="ghost" data-ghost>Results</div>
      <div className="wrap">
        <SecHead set="Set 06 · The proof" title={<>Before. <em>After.</em> <span className="br">Drag.</span></>}
          lede="Real client transformations, shared with faces covered. Drag across each photo to compare the starting point with the result." />
        <div className="ba-row">
          {TRANSFORMATIONS.map((t, i) => <BeforeAfter key={t.h} t={t} index={i} />)}
        </div>
        <div className="checkin">
          <div className="ci-card reveal">
            <span className="mono" style={{ color: 'var(--bronze-hi)' }}>Client check-in · empty stomach, week 3</span>
            <div className="ci-top">
              <b className="tnum"><span id="ciKg">70.4</span><small>kg</small></b>
              <span className="delta tnum">−4.6 kg in 3 weeks</span>
            </div>
            <svg className="ci-chart" viewBox="0 0 600 190" aria-label="Weight fell from 75 kilograms at the start to 70.4 kilograms at week 3">
              <defs>
                <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#c98b42" stopOpacity=".35" /><stop offset="1" stopColor="#c98b42" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g stroke="#2a2c30" strokeWidth="1">
                <line x1="40" y1="20" x2="580" y2="20" /><line x1="40" y1="80" x2="580" y2="80" /><line x1="40" y1="140" x2="580" y2="140" />
              </g>
              <text x="0" y="24">76</text><text x="0" y="84">73</text><text x="0" y="144">70</text>
              <text x="40" y="180">Start</text><text x="220" y="180">Week 1</text><text x="400" y="180">Week 2</text><text x="540" y="180">Week 3</text>
              <path id="ciArea" d="M60 40 L560 132 L560 160 L60 160Z" fill="url(#gfill)" opacity=".6" />
              <path id="ciLine" d="M60 40 L560 132" stroke="#ecbd78" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="520" strokeDashoffset="0" />
              <circle cx="60" cy="40" r="6" fill="#0b0c0e" stroke="#eeece6" strokeWidth="2" />
              <circle id="ciDot" cx="560" cy="132" r="8" fill="#c98b42" stroke="#0b0c0e" strokeWidth="3" />
              <text x="72" y="36" style={{ fill: '#eeece6' }}>75.0 kg</text>
              <text x="470" y="122" style={{ fill: '#ecbd78' }}>70.4 kg</text>
            </svg>
            <p style={{ margin: 0, color: 'var(--chalk-3)', fontSize: 14 }}>Start and week-3 weigh-ins as reported by the client over WhatsApp. Line drawn between the two points.</p>
          </div>
          <div className="ci-chat reveal">
            <img src={img('checkin-chat.jpg')} alt="WhatsApp check-in showing a client's week 3 weight of 70.4 kg with progress photos" loading="lazy" />
            <span className="mono">Weekly WhatsApp check-in</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 07 PODIUM ================= */
export function Podium() {
  return (
    <section className="podium" id="podium" data-set="7" data-name="The Record" data-kg="200">
      <div className="pod-pin" id="podPin">
        <div className="wrap">
          <SecHead set="Set 07 · The record" style={{ marginBottom: 'clamp(30px,4vw,50px)' }}
            title={<>Twenty-four <em>times on</em> <span className="br">stage.</span></>}
            lede="Bodybuilding and powerlifting, year by year. Keep scrolling to move through the record." />
        </div>
        <div className="pod-track" id="podTrack">
          {RECORD.map(([y, items]) => (
            <article className="yr" key={y}>
              <div className="yr-h"><b>{y}</b><span className="cnt">{items.length} result{items.length > 1 ? 's' : ''}</span></div>
              <ul>
                {items.map(([title, sub, pl], i) => (
                  <li key={i}><span className={`medal ${pl ? 'pl' : ''}`}><i /></span><span>{title}<small>{sub}</small></span></li>
                ))}
              </ul>
              <span className="big">{y.slice(2)}</span>
            </article>
          ))}
        </div>
        <div className="legend mono">
          <span><span className="medal"><i /></span>Bodybuilding</span>
          <span><span className="medal pl"><i /></span>Powerlifting</span>
        </div>
      </div>
    </section>
  );
}

/* ================= 08 PLANS ================= */
const planMsg = (plan, mode) => `Hi Rashed, I'm interested in ${plan} (${mode}). Please share the details and fees.`;

export function Plans() {
  const [n, setN] = useState(3);

  return (
    <section className="sec pricing" id="plans" data-set="8" data-name="The Plans" data-kg="220">
      <div className="ghost" data-ghost>Plans</div>
      <div className="wrap">
        <SecHead set="Set 08 · Top set" title={<>Choose the <em>load.</em></>}
          lede="Start with a single plan, take a full month of online coaching, or train in person with Rashed on the floor. Each button opens a WhatsApp chat with Rashed, who shares fees and next steps." />
        <div className="price-grid">
          {ONLINE_PLANS.map((p) => (
            <article key={p.id} className={`pcard ${p.featured ? 'feat' : ''}`} data-tilt="5">
              <span className="glare" />
              <span className={`mono ${p.featured ? 'flag' : ''}`}>{p.mode}</span>
              <h3>{p.title}</h3>
              <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={`btn sm ${p.featured ? '' : 'ghost'}`} href={waLink(planMsg(p.plan, 'online'))} target="_blank" rel="noopener noreferrer">
                <WaIcon /> {p.cta}
              </a>
            </article>
          ))}
        </div>
        <div className="pt reveal">
          <div>
            <span className="mono" style={{ color: 'var(--bronze-hi)' }}>In person · personal training</span>
            <h3>Train with Rashed on the floor</h3>
            <p>One-to-one sessions every week for a month. Slide to set the training frequency.</p>
          </div>
          <div className="sess-ctl">
            <div className="sess-top">
              <div className="sess-n tnum">{n}<small>sessions / week</small></div>
            </div>
            <label htmlFor="sess" className="mono" style={{ color: 'var(--chalk-3)' }}>Sessions per week</label>
            <input className="range" id="sess" type="range" min="3" max="5" step="1" value={n}
              style={{ '--fill': `${((n - 3) / 2) * 100}%` }} onChange={(e) => setN(+e.target.value)} />
            <div className="week">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                <span key={d} className={PT_DAYS[n].includes(i) ? 'on' : ''}>{d}</span>
              ))}
            </div>
            <div className="sess-meta mono">
              <span>Per month · <b className="tnum" style={{ color: 'var(--chalk)' }}>about {n * 4} sessions</b></span>
              <a className="btn sm" href={waLink(planMsg(ptPlan(n), 'in person'))} target="_blank" rel="noopener noreferrer"><WaIcon /> Ask on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 09 BOOK ================= */
function CopyRow({ label, value, copy, href, linkLabel = 'Open' }) {
  const [state, setState] = useState('Copy');
  const textRef = useRef(null);
  const onCopy = () => {
    const done = () => { setState('Copied'); setTimeout(() => setState('Copy'), 1600); };
    const select = () => {
      const r = document.createRange(); r.selectNodeContents(textRef.current);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); setState('Selected');
    };
    try { navigator.clipboard.writeText(copy).then(done, select); } catch { select(); }
  };
  return (
    <div className="ct-row">
      <div><span className="mono">{label}</span><b ref={textRef}>{value}</b></div>
      {href
        ? <a className="copy" href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{linkLabel}</a>
        : <button className={`copy ${state === 'Copied' ? 'done' : ''}`} type="button" onClick={onCopy}>{state}</button>}
    </div>
  );
}

export function Book({ booking, setBooking }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState(false);
  const nameRef = useRef(null);

  const text = useMemo(() => (
    `Hi Rashed, I'm ${name.trim() || '[name]'}.\nGoal: ${booking.goal}\nFormat: ${booking.mode}\nPlan: ${booking.plan}` +
    `${msg.trim() ? `\nAbout me: ${msg.trim()}` : ''}\n\nI'd like to book a consultation.`
  ), [name, msg, booking]);
  const wa = waLink(text);

  return (
    <section className="sec book" id="book" data-set="9" data-name="Rack the Bar" data-kg="240">
      <div className="ghost" data-ghost>Start</div>
      <div className="wrap">
        <div className="book-grid">
          <div>
            <span className="set mono">Set 09 · Rack the bar</span>
            <Split as="h2" className="book-h" style={{ marginTop: 18 }}>Your <span className="o">first</span> <span className="br">rep.</span></Split>
            <p className="lede" style={{ marginTop: 22 }}>Send the goal and a little background. Rashed replies on WhatsApp with the right plan and next steps.</p>
            <div className="contacts">
              <CopyRow label="WhatsApp" value={CONTACT.phone} href={waLink()} linkLabel="Chat" />
              <CopyRow label="Phone" value={CONTACT.phone} copy={`+${CONTACT.phoneRaw}`} />
              <CopyRow label="Email" value={CONTACT.email} copy={CONTACT.email} />
              <CopyRow label="Instagram" value={`@${CONTACT.instagram}`} href={`https://www.instagram.com/${CONTACT.instagram}/`} />
            </div>
          </div>

          <form className="bk reveal" noValidate onSubmit={(e) => e.preventDefault()}>
            <span className="mono t">Consultation request</span>
            <h3>Build the plan</h3>
            <div className="field">
              <label htmlFor="fName">Name</label>
              <input id="fName" ref={nameRef} autoComplete="name" placeholder="Full name" value={name} onChange={(e) => { setName(e.target.value); setErr(false); }} />
            </div>
            <div className="field">
              <span className="lab" id="lGoal">Goal</span>
              <div className="seg" role="radiogroup" aria-labelledby="lGoal">
                {GOALS.map((g, i) => (
                  <span key={g.k} style={{ display: 'contents' }}>
                    <input type="radio" name="goal" id={`g${i}`} value={g.k} checked={booking.goal === g.k} onChange={() => setBooking((b) => ({ ...b, goal: g.k }))} />
                    <label htmlFor={`g${i}`}>{g.k}</label>
                  </span>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lab" id="lMode">Format</span>
              <div className="seg" role="radiogroup" aria-labelledby="lMode">
                {[['m1', 'Online coaching', 'Online'], ['m2', 'In-person training', 'In person']].map(([id, v, l]) => (
                  <span key={id} style={{ display: 'contents' }}>
                    <input type="radio" name="mode" id={id} value={v} checked={booking.mode === v} onChange={() => setBooking((b) => ({ ...b, mode: v }))} />
                    <label htmlFor={id}>{l}</label>
                  </span>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="fPlan">Plan</label>
              <select id="fPlan" value={booking.plan} onChange={(e) => setBooking((b) => ({ ...b, plan: e.target.value }))}>
                {PLAN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="fMsg">Background</label>
              <textarea id="fMsg" placeholder="Current weight, training history, injuries, schedule" value={msg} onChange={(e) => setMsg(e.target.value)} />
            </div>
            <div className="field"><span className="lab">Message preview</span><div className="bk-preview">{text}</div></div>
            {err && <p className="err">Add a name so Rashed knows who is writing.</p>}
            <a className="btn" href={wa} target="_blank" rel="noopener noreferrer" data-magnet
              onClick={(e) => { if (!name.trim()) { e.preventDefault(); setErr(true); nameRef.current.focus(); } }}>
              <WaIcon /> Send on WhatsApp <span className="arr">→</span>
            </a>
            <p className="bk-note">Opens a WhatsApp chat with {CONTACT.phone} with this message filled in.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
