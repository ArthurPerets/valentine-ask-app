import { useMemo, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import YippieScreen from './components/YippieScreen';

type Screen = 'question' | 'yippie';

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
        display: 'grid',
        placeItems: 'center',
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
