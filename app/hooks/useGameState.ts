"use client";

import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

const STORAGE_KEY = 'crosswordle_game_state';

interface GameStats {
  highScore: number;
  gamesPlayed: number;
  longestStreak: number;
}

const DEFAULT_STATS: GameStats = {
  highScore: 0,
  gamesPlayed: 0,
  longestStreak: 0,
};

export function useGameState(initialState: GameState) {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [gameStats, setGameStats] = useState<GameStats>(DEFAULT_STATS);

  // 加载保存的游戏状态
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const { state, stats } = JSON.parse(savedState);
      setGameState(prev => ({
        ...prev,
        ...state,
        lastPlayedAt: state.lastPlayedAt ? new Date(state.lastPlayedAt) : null,
      }));
      setGameStats(stats);
    }
  }, []);

  // 保存游戏状态
  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => {
      const updated = { ...prev, ...newState };
      
      // 更新统计数据
      if (newState.gameOver) {
        const newStats = {
          ...gameStats,
          gamesPlayed: gameStats.gamesPlayed + 1,
          highScore: Math.max(gameStats.highScore, updated.score),
          longestStreak: Math.max(gameStats.longestStreak, updated.streak),
        };
        setGameStats(newStats);
        
        // 保存到本地存储
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          state: updated,
          stats: newStats,
        }));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          state: updated,
          stats: gameStats,
        }));
      }
      
      return updated;
    });
  };

  return {
    gameState,
    gameStats,
    updateGameState,
  };
} 