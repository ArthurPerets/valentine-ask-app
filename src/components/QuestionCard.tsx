import { useMemo } from 'react';

type Props = {
  question: string;
  noCount: number;
  yesScale: number;
  onYes: () => void;
  onNo: () => void;
};

const labels = [
  'No',
  'Are you sure?',
  'Really sure?',
  'Think again 😳',
  'Last chance…',
  'You mean yes?',
];

export default function QuestionCard({
  question,
  noCount,
  yesScale,
  onYes,
  onNo,
}: Props) {
  const noLabel = useMemo(
    () => labels[Math.min(noCount, labels.length - 1)],
    [noCount],
  );

  return (
    <div
      style={{
        maxWidth: 520,
        padding: 28,
        borderRadius: 22,
        background: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      <h1>{question}</h1>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={onYes}
          style={{
            transform: `scale(${yesScale})`,
            transition: 'transform 0.2s ease',
            padding: '12px 20px',
            borderRadius: 999,
            background: '#ff4d6d',
            color: 'white',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Yes 💖
        </button>

        <button
          onClick={onNo}
          style={{
            padding: '12px 20px',
            borderRadius: 999,
            background: '#eee',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {noLabel}
        </button>
      </div>
    </div>
  );
}
