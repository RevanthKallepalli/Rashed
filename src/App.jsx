import { useCallback, useState } from 'react';
import { Loader, Cursor, Nav, Hud } from './components/Chrome';
import Hero from './components/Hero';
import { Coach, Physique, Credentials, Programs, Nutrition } from './components/Journey';
import { Proof, Podium, Plans, Book } from './components/Finale';
import { WhatsAppFab } from './components/WhatsApp';
import useScrollFX from './hooks/useScrollFX';
import usePointerFX from './hooks/usePointerFX';
import { GOALS, PLAN_OPTIONS } from './data';

// The page is one training session: nine "sets", each section adding weight to the bar.
export default function App() {
  const [ready, setReady] = useState(false);
  const [booking, setBooking] = useState({ goal: GOALS[0].k, mode: 'Online coaching', plan: PLAN_OPTIONS[0] });

  const onLoaded = useCallback(() => setReady(true), []);

  useScrollFX(ready);
  usePointerFX(ready);

  return (
    <>
      <Loader onDone={onLoaded} />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <Hud />
      <WhatsAppFab />
      <main>
        <Hero ready={ready} />
        <Coach />
        <Physique />
        <Credentials />
        <Programs />
        <Nutrition />
        <Proof />
        <Podium />
        <Plans />
        <Book booking={booking} setBooking={setBooking} />
      </main>
      <footer>
        <div className="wrap mono">
          <span>Mohd Rashed · Fitness &amp; Nutrition</span>
          <span>Certified trainer · Bodybuilding athlete · Powerlifter</span>
        </div>
      </footer>
    </>
  );
}
