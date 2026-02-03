import { useEffect } from 'react';
import confetti from 'canvas-confetti';

type Props = {
  headline: string;
  message: string;
};

export default function YippieScreen({ headline, message }: Props) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
    });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 40 }}>{headline}</h1>
      <p style={{ fontSize: 18 }}>{message}</p>
    </div>
  );
}
