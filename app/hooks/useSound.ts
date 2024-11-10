"use client";

import { useEffect, useRef } from 'react';

type SoundEffects = {
  keyPress: HTMLAudioElement;
  correct: HTMLAudioElement;
  wrong: HTMLAudioElement;
  victory: HTMLAudioElement;
  hint: HTMLAudioElement;
};

export function useGameSounds() {
  const sounds = useRef<Partial<SoundEffects>>({});
  const isMuted = useRef(false);

  useEffect(() => {
    sounds.current = {
      keyPress: new Audio('/sounds/key-press.mp3'),
      correct: new Audio('/sounds/correct.mp3'),
      wrong: new Audio('/sounds/wrong.mp3'),
      victory: new Audio('/sounds/victory.mp3'),
      hint: new Audio('/sounds/hint.mp3'),
    };

    // Set volumes
    if (sounds.current.keyPress) sounds.current.keyPress.volume = 0.3;
    if (sounds.current.correct) sounds.current.correct.volume = 0.4;
    if (sounds.current.wrong) sounds.current.wrong.volume = 0.4;
    if (sounds.current.victory) sounds.current.victory.volume = 0.5;
    if (sounds.current.hint) sounds.current.hint.volume = 0.4;

    return () => {
      Object.values(sounds.current).forEach(sound => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = (type: keyof SoundEffects) => {
    if (isMuted.current || !sounds.current[type]) return;
    
    const sound = sounds.current[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const toggleMute = () => {
    isMuted.current = !isMuted.current;
    return isMuted.current;
  };

  const getMuteStatus = () => isMuted.current;

  return { playSound, toggleMute, getMuteStatus };
}