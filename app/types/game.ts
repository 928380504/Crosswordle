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
}

export interface CellState {
  letter: string;
  state: 'correct' | 'present' | 'absent' | 'empty';
}