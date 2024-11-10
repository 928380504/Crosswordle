"use client";

import { useState, useEffect } from 'react';
import { addDays, isSameDay, startOfDay } from 'date-fns';

// 使用一个固定的种子日期来生成每日挑战
const SEED_DATE = new Date(2024, 0, 1);
const DAILY_WORDS = [
  ["REACT", "REDUX", "NEXT", "NODE", "TYPE"],
  ["STYLE", "STATE", "STACK", "STORE", "SWIFT"],
  ["CLASS", "CLOUD", "CLEAN", "CLEAR", "CLOSE"],
  // 添加更多单词组
];

interface DailyChallengeState {
  isDaily: boolean;
  canPlay: boolean;
  nextChallengeTime: Date | null;
  todaysWords: string[];
}

export function useDailyChallenge() {
  const [dailyState, setDailyState] = useState<DailyChallengeState>({
    isDaily: false,
    canPlay: true,
    nextChallengeTime: null,
    todaysWords: [],
  });

  useEffect(() => {
    checkDailyChallenge();
  }, []);

  const checkDailyChallenge = () => {
    const today = startOfDay(new Date());
    const lastPlayed = localStorage.getItem('lastDailyChallengeDate');
    const lastPlayedDate = lastPlayed ? new Date(lastPlayed) : null;

    const canPlay = !lastPlayedDate || !isSameDay(lastPlayedDate, today);
    const nextChallengeTime = canPlay ? null : addDays(today, 1);

    // 根据日期生成今天的单词组
    const daysSinceSeed = Math.floor(
      (today.getTime() - SEED_DATE.getTime()) / (1000 * 60 * 60 * 24)
    );
    const wordSetIndex = daysSinceSeed % DAILY_WORDS.length;
    const todaysWords = DAILY_WORDS[wordSetIndex];

    setDailyState({
      isDaily: false,
      canPlay,
      nextChallengeTime,
      todaysWords,
    });
  };

  const startDailyChallenge = () => {
    if (!dailyState.canPlay) return false;

    setDailyState(prev => ({
      ...prev,
      isDaily: true,
    }));

    return true;
  };

  const completeDailyChallenge = () => {
    localStorage.setItem('lastDailyChallengeDate', new Date().toISOString());
    checkDailyChallenge();
  };

  return {
    dailyState,
    startDailyChallenge,
    completeDailyChallenge,
  };
} 