import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiTriggerProps {
  trigger?: boolean;
}

export function ConfettiTrigger({ trigger = true }: ConfettiTriggerProps) {
  useEffect(() => {
    if (!trigger) return;

    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#D4A424", "#1e3a5f", "#ffffff", "#fbbf24"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    frame();
  }, [trigger]);

  return null;
}
