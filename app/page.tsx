"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import GameBoard from "./components/GameBoard";
import GameRules from "./components/GameRules";
import { GameState } from "./types/game";
import { useGameState } from './hooks/useGameState';
import { Badge } from "@/components/ui/badge";
import GameStats from "./components/GameStats";

const WORDS = [
  ["REACT", "REDUX", "NEXT", "NODE", "TYPE"],
  ["STYLE", "STATE", "STACK", "STORE", "SWIFT"],
  ["CLASS", "CLOUD", "CLEAN", "CLEAR", "CLOSE"],
];

const INITIAL_STATE: GameState = {
  board: Array(5).fill(0).map(() => Array(5).fill("")),
  currentRow: 0,
  currentCol: 0,
  gameWords: [],
  input: "",
  message: "",
  gameOver: false,
  hints: 3,
  score: 0,
  streak: 0,
  timeElapsed: 0,
  isLoading: false,
  lastPlayedAt: null,
  gameMode: null,
};

export default function Home() {
  const { gameState, gameStats, updateGameState } = useGameState(INITIAL_STATE);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // 初始化游戏
  useEffect(() => {
    startNewGame();
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  // 开始新游戏
  const startNewGame = () => {
    if (timer) clearInterval(timer);
    
    const randomSet = WORDS[Math.floor(Math.random() * WORDS.length)];
    updateGameState({
      ...INITIAL_STATE,
      gameWords: randomSet,
      streak: gameState.gameOver ? 0 : gameState.streak,
      lastPlayedAt: new Date()
    });

    const newTimer = setInterval(() => {
      updateGameState({
        timeElapsed: gameState.timeElapsed + 1
      });
    }, 1000);

    setTimer(newTimer);
  };

  // 处理输入更新
  const handleInputChange = (value: string) => {
    updateGameState({
      input: value.toUpperCase(),
      message: ""
    });
  };

  // 处理提交
  const handleSubmit = () => {
    const { input, currentRow, gameWords } = gameState;

    if (input.length !== 5) {
      updateGameState({
        message: "Please enter a 5-letter word"
      });
      return;
    }

    const word = input.toUpperCase();
    const currentWord = gameWords[currentRow];

    // 创建新的游戏板
    const newBoard = gameState.board.map((row, i) => 
      i === currentRow ? word.split('') : row
    );

    if (gameWords.includes(word)) {
      const isLastRow = currentRow === 4;
      const newScore = calculateScore(100);
      
      updateGameState({
        board: newBoard,
        input: "",
        currentRow: gameState.currentRow + 1,
        message: isLastRow ? "Congratulations! Game completed!" : "Correct word!",
        gameOver: isLastRow,
        score: gameState.score + newScore,
        streak: isLastRow ? gameState.streak + 1 : gameState.streak
      });

      if (isLastRow && timer) {
        clearInterval(timer);
      }
    } else {
      updateGameState({
        board: newBoard,
        input: "",
        message: "Word not in list!"
      });
    }
  };

  // 处理提示
  const handleHint = () => {
    const { hints, currentRow, gameWords } = gameState;
    if (hints > 0) {
      const currentWord = gameWords[currentRow];
      updateGameState({
        input: currentWord[0],
        hints: gameState.hints - 1,
        message: `Hint: The word starts with "${currentWord[0]}"`
      });
    }
  };

  // 处理按键
  const handleKeyPress = (key: string) => {
    if (gameState.gameOver) return;
    
    const { input } = gameState;

    switch (key) {
      case 'ENTER':
        handleSubmit();
        break;
      case 'BACKSPACE':
        handleInputChange(input.slice(0, -1));
        break;
      default:
        if (input.length < 5) {
          handleInputChange(input + key);
        }
        break;
    }
  };

  // 计算分数
  const calculateScore = (baseScore: number) => {
    const timeBonus = Math.max(0, 300 - gameState.timeElapsed);
    const hintPenalty = (3 - gameState.hints) * 50;
    return baseScore + timeBonus - hintPenalty;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Crosswordle
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <GameStats stats={{
              ...gameStats,
              averageTime: 180,
              totalHintsUsed: 0,
              perfectGames: 0,
            }} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline">
              High Score: {gameStats.highScore}
            </Badge>
            <Badge variant="outline">
              Games Played: {gameStats.gamesPlayed}
            </Badge>
            <Badge variant="outline">
              Longest Streak: {gameStats.longestStreak}
            </Badge>
          </div>
          <GameBoard
            board={gameState.board}
            gameWords={gameState.gameWords}
            currentRow={gameState.currentRow}
            input={gameState.input}
            message={gameState.message}
            gameOver={gameState.gameOver}
            score={gameState.score}
            streak={gameState.streak}
            timeElapsed={gameState.timeElapsed}
            hints={gameState.hints}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onHint={handleHint}
            onNewGame={startNewGame}
            onKeyPress={handleKeyPress}
          />
          <GameRules />
        </div>
      </div>
    </div>
  );
}