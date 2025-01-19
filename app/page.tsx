"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Star, Target } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import GameBoard from "./components/GameBoard";
import GameRules from "./components/GameRules";
import { 
  GameState, 
  DifficultyConfig, 
  Difficulty,
  DifficultySettings 
} from "./types/game";
import { useGameState } from './hooks/useGameState';
import { Badge } from "@/components/ui/badge";
import GameStats from "./components/GameStats";
import { toast } from "sonner";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

// 扩展词库
const WORDS = [
  ["REACT", "REDUX", "NEXT", "NODE", "TYPE"],
  ["STYLE", "STATE", "STACK", "STORE", "SWIFT"],
  ["CLASS", "CLOUD", "CLEAN", "CLEAR", "CLOSE"],
  ["BUILD", "BREAK", "BRAVE", "BRING", "BRAIN"],
  ["FLASH", "FLAME", "FLARE", "FLOAT", "FLOOR"],
  ["SPACE", "SPARK", "SPEAK", "SPEED", "SPELL"],
];

// 修改难度设置的类型注解
const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: {
    timeBonus: 400,
    hints: 3,
    baseScore: 100,
  },
  normal: {
    timeBonus: 300,
    hints: 2,
    baseScore: 150,
  },
  hard: {
    timeBonus: 200,
    hints: 1,
    baseScore: 200,
  },
};

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
  difficulty: 'normal',
  combo: 0,
  achievements: [],
};

export default function Home() {
  const { gameState, gameStats, updateGameState } = useGameState(INITIAL_STATE);
  const [timer, setTimer] = React.useState<ReturnType<typeof setInterval> | null>(null);
  const [difficulty, setDifficulty] = React.useState<Difficulty>('normal');

  // 初始化游戏
  React.useEffect(() => {
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

  // 处理提交的增强版本
  const handleSubmit = () => {
    const { input, currentRow, gameWords, combo } = gameState;

    if (input.length !== 5) {
      updateGameState({
        message: "Please enter a 5-letter word"
      });
      return;
    }

    const word = input.toUpperCase();
    const currentWord = gameWords[currentRow];

    const newBoard = gameState.board.map((row: string[], i: number) => 
      i === currentRow ? word.split('') : row
    );

    if (gameWords.includes(word)) {
      const isLastRow = currentRow === 4;
      const newCombo = combo + 1;
      const comboBonus = Math.floor(newCombo * 0.5) * 50; // 连击奖励
      const newScore = calculateScore(DIFFICULTY_SETTINGS[difficulty].baseScore) + comboBonus;
      
      // 检查是否达成成就
      const newAchievements = checkAchievements(newScore, newCombo);
      
      if (newAchievements.length > 0) {
        newAchievements.forEach(achievement => {
          toast.success(`Achievement Unlocked: ${achievement}`);
        });
      }

      updateGameState({
        board: newBoard,
        input: "",
        currentRow: gameState.currentRow + 1,
        message: isLastRow ? "Congratulations! Game completed!" : `Correct! +${newScore} points (${comboBonus} combo bonus)`,
        gameOver: isLastRow,
        score: gameState.score + newScore,
        streak: isLastRow ? gameState.streak + 1 : gameState.streak,
        combo: newCombo,
        achievements: [...gameState.achievements, ...newAchievements]
      });

      if (isLastRow && timer) {
        clearInterval(timer);
        handlePerfectGame();
      }
    } else {
      updateGameState({
        board: newBoard,
        input: "",
        message: "Word not in list!",
        combo: 0 // 重置连击
      });
    }
  };

  // 完美游戏检查
  const handlePerfectGame = () => {
    const { hints, timeElapsed } = gameState;
    if (hints === DIFFICULTY_SETTINGS[difficulty].hints && timeElapsed < 180) {
      toast.success("Perfect Game! +500 bonus points!");
      updateGameState({
        score: gameState.score + 500
      });
    }
  };

  // 成就检查
  const checkAchievements = (score: number, combo: number): string[] => {
    const newAchievements: string[] = [];
    
    if (score > 1000 && !gameState.achievements.includes("High Scorer")) {
      newAchievements.push("High Scorer");
    }
    
    if (combo >= 5 && !gameState.achievements.includes("Combo Master")) {
      newAchievements.push("Combo Master");
    }
    
    if (gameState.streak >= 3 && !gameState.achievements.includes("Streak Champion")) {
      newAchievements.push("Streak Champion");
    }

    return newAchievements;
  };

  // 修改计分系统
  const calculateScore = (baseScore: number) => {
    const settings = DIFFICULTY_SETTINGS[difficulty as Difficulty];
    const timePoints = Math.max(0, settings.timeBonus - gameState.timeElapsed);
    const hintPenalty = (settings.hints - gameState.hints) * 50;
    return baseScore + timePoints - hintPenalty;
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
          <div className="flex justify-center gap-4">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                onClick={() => setDifficulty(level)}
                className="capitalize"
                disabled={gameState.currentRow > 0}
              >
                {level}
              </Button>
            ))}
          </div>

          {gameState.combo > 1 && (
            <div className="text-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {gameState.combo}x Combo!
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <Badge className="px-4 py-2">
              High Score: {gameStats.highScore}
            </Badge>
            <Badge className="px-4 py-2">
              Games Played: {gameStats.gamesPlayed}
            </Badge>
            <Badge className="px-4 py-2">
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
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
}