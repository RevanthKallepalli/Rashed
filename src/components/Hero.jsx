import { useLayoutEffect, useRef } from 'react';
import BarbellScene from './BarbellScene';
import Split from './Split';
import { MARQUEE, img, waLink } from '../data';
import { WaIcon } from './WhatsApp';
import { gsap, prefersReducedMotion } from '../lib/motion';

export default function Hero({ ready }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-title .c', { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.04 })
        .from('.hero-kicker span', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=.8')
        .from('.hero-sub, .hero-cta', { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=.6')
        .from('.hero-card .frame', { clipPath: 'inset(100% 0 0 0 round 200px 200px 18px 18px)', duration: 1.2, ease: 'expo.inOut' }, '-=1.3')
        .from('.hero-card img', { scale: 1.4, duration: 1.6, ease: 'expo.out' }, '-=.9')
        .from('.badge', { scale: 0.6, opacity: 0, y: 20, stagger: 0.12, duration: 0.7, ease: 'back.out(1.8)' }, '-=.9')
        .from('.nav .wrap > *', { y: -30, opacity: 0, stagger: 0.08, duration: 0.6, clearProps: 'transform' }, '-=1')
        .from('.hud', { y: 80, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' }, '-=.6');
    }, document.body);
    return () => ctx.revert();
  }, [ready]);

  return (
    <>
      <section className="hero" id="top" data-set="0" data-name="Arrival" data-kg="20" ref={root}>
        <BarbellScene loaded={ready} />
        <div className="wrap">
          <div>
            <div className="hero-kicker mono">
              <span>Certified Personal Trainer</span><span>Competitive Bodybuilder</span><span>Powerlifter</span>
            </div>
            <h1 className="hero-title">
              <Split className="l1">Mohd</Split>
              <Split className="l2">Rashed<span className="dot">.</span></Split>
            </h1>
            <p className="hero-sub">
              Eight years under the bar. Four Mr. Telangana titles. A 2025 state powerlifting gold. Now the same discipline goes into{' '}
              <b>a structured, personal plan built around one client at a time.</b>
            </p>
            <div className="hero-cta">
              <a className="btn" href={waLink()} target="_blank" rel="noopener noreferrer" data-magnet><WaIcon /> Book on WhatsApp <span className="arr">→</span></a>
              <a className="btn ghost" href="#proof" data-magnet>See the results</a>
            </div>
          </div>
          <div className="hero-card" data-tilt="10">
            <div className="frame"><img src={img('hero.jpg')} alt="Mohd Rashed in the gym, wearing a yellow training tee" /></div>
            <div className="badge b1"><span className="mono">Experience</span><b>8 Years</b></div>
            <div className="badge b2"><span className="mono">2025 · WPC State</span><b>Gold</b></div>
          </div>
        </div>
        <div className="drag-hint mono"><i />Scroll to begin · drag the bar</div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    </>
  );
}
