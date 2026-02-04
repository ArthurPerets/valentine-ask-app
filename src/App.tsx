import './App.css'
import { useMemo, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import YippieScreen from './components/YippieScreen';

type Screen = 'question' | 'yippie';

const API_BASE = import.meta.env.VITE_API_BASE_URL;


async function notifyAnswer(answer: 'yes' | 'no') {
  console.log('[notifyAnswer] sending:', answer);
  console.log('[notifyAnswer] API_BASE:', API_BASE);

  try {
    const res = await fetch(`${API_BASE}/api/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    });

    console.log('[notifyAnswer] response status:', res.status);

    const data = await res.json();
    console.log('[notifyAnswer] response body:', data);
  } catch (err) {
    console.error('[notifyAnswer] fetch failed:', err);
  }
}


const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function App() {
  const [screen, setScreen] = useState<Screen>('question');
  const [noCount, setNoCount] = useState(0);

  const yesScale = useMemo(
    () => clamp(1 + noCount * 0.15, 1, 2.75),
    [noCount],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      {screen === 'question' ? (
        <QuestionCard
          question="Do you want to go out with me on Valentine’s Day?"
          noCount={noCount}
          yesScale={yesScale}
          onYes={() => setScreen('yippie')}
          onNo={() => setNoCount((c) => c + 1)}
        />
      ) : (
        <YippieScreen headline="Yippie!! 🎉" message="I can’t wait 💖" />
      )}
    </div>
  );
}
