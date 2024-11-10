"use client";

import { useCallback, useState } from 'react';
import useSound from 'use-sound';

export function useGameSounds() {
  const [isMuted, setIsMuted] = useState(false);

  const [playKeyPress] = useSound('/sounds/keypress.mp3', { soundEnabled: !isMuted });
  const [playCorrect] = useSound('/sounds/correct.mp3', { soundEnabled: !isMuted });
  const [playWrong] = useSound('/sounds/wrong.mp3', { soundEnabled: !isMuted });
  const [playVictory] = useSound('/sounds/victory.mp3', { soundEnabled: !isMuted });
  const [playHint] = useSound('/sounds/hint.mp3', { soundEnabled: !isMuted });

  const playSound = useCallback((type: 'keyPress' | 'correct' | 'wrong' | 'victory' | 'hint') => {
    if (isMuted) return;

    switch (type) {
      case 'keyPress':
        playKeyPress();
        break;
      case 'correct':
        playCorrect();
        break;
      case 'wrong':
        playWrong();
        break;
      case 'victory':
        playVictory();
        break;
      case 'hint':
        playHint();
        break;
    }
  }, [isMuted, playKeyPress, playCorrect, playWrong, playVictory, playHint]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const getMuteStatus = useCallback(() => {
    return isMuted;
  }, [isMuted]);

  return { playSound, toggleMute, getMuteStatus };
}