export type Difficulty = 'easy' | 'normal' | 'hard';

export interface GameState {
  board: string[][];
  currentRow: number;
  currentCol: number;
  gameWords: string[];
  input: string;
  message: string;
  gameOver: boolean;
  hints: number;
  score: number;
  streak: number;
  timeElapsed: number;
  isLoading: boolean;
  lastPlayedAt: Date | null;
  gameMode: 'daily' | 'practice' | null;
  difficulty: Difficulty;
  combo: number;
  achievements: string[];
}

// 难度设置类型
export interface DifficultySettings {
  timeBonus: number;
  hints: number;
  baseScore: number;
}

export interface DifficultyConfig {
  easy: DifficultySettings;
  normal: DifficultySettings;
  hard: DifficultySettings;
}

// 单元格状态类型
export type CellStateType = "correct" | "present" | "absent" | "empty";

// 单元格状态接口
export interface CellState {
  letter: string;
  state: CellStateType;
}