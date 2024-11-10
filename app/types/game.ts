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
}

// 单元格状态类型
export type CellStateType = "correct" | "present" | "absent" | "empty";

// 单元格状态接口
export interface CellState {
  letter: string;
  state: CellStateType;
}