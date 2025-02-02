"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Star, Target, RefreshCcw } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import GameBoard from "./components/GameBoard";
import GameRules from "./components/GameRules";
import { GameState } from "./types/game";
import { useGameState } from './hooks/useGameState';
import { Badge } from "@/components/ui/badge";
import GameStats from "./components/GameStats";
import { toast } from "sonner";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { getRandomWordSet } from "@/app/data/wordSets";

// 简化设置
const GAME_SETTINGS = {
  timeBonus: 300,
  hints: 3,
  baseScore: 150,
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
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // 修改初始化游戏
  React.useEffect(() => {
    startNewGame();
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  // 修改开始新游戏
  const startNewGame = () => {
    if (timer) clearInterval(timer);
    
    const randomSet = getRandomWordSet();
    setTimeElapsed(0);
    
    updateGameState({
      ...INITIAL_STATE,
      gameWords: randomSet,
      streak: gameState.gameOver ? 0 : gameState.streak,
      lastPlayedAt: new Date(),
      timeElapsed: 0
    });

    const newTimer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        updateGameState({ timeElapsed: newTime });
        return newTime;
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
      const comboBonus = Math.floor(newCombo * 0.5) * 50;
      const newScore = calculateScore(GAME_SETTINGS.baseScore) + comboBonus;
      
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
    if (hints === GAME_SETTINGS.hints && timeElapsed < 180) {
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
    const timePoints = Math.max(0, GAME_SETTINGS.timeBonus - gameState.timeElapsed);
    const hintPenalty = (GAME_SETTINGS.hints - gameState.hints) * 50;
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
      {/* 移除阴影和边框 */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1400px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 512 512" 
                className="text-primary"
              >
                <rect width="512" height="512" rx="128" className="fill-primary/10"/>
                <path 
                  d="M256 128C256 119.163 263.163 112 272 112H368C376.837 112 384 119.163 384 128V224C384 232.837 376.837 240 368 240H272C263.163 240 256 232.837 256 224V128Z" 
                  className="fill-emerald-500"
                />
                <path 
                  d="M128 272C128 263.163 135.163 256 144 256H240C248.837 256 256 263.163 256 272V368C256 376.837 248.837 384 240 384H144C135.163 384 128 376.837 128 368V272Z" 
                  className="fill-yellow-500"
                />
                <path 
                  d="M272 272C272 263.163 279.163 256 288 256H384C392.837 256 400 263.163 400 272V368C400 376.837 392.837 384 384 384H288C279.163 384 272 376.837 272 368V272Z" 
                  className="fill-blue-500"
                />
              </svg>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Crosswordle
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {gameState.combo > 1 && (
            <div className="text-center mb-2">
              <Badge variant="secondary" className="text-base px-3 py-0.5">
                {gameState.combo}x Combo!
              </Badge>
            </div>
          )}

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