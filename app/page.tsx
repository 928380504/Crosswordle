"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, RefreshCcw } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import SoundToggle from "./components/SoundToggle";
import GameBoard from "./components/GameBoard";
import GameRules from "./components/GameRules";
import { GameState } from "./types/game";
import { useGameSounds } from "./hooks/useSound";

const WORDS = [
  ["REACT", "REDUX", "NEXT", "NODE", "TYPE"],
  ["STYLE", "STATE", "STACK", "STORE", "SWIFT"],
  ["CLASS", "CLOUD", "CLEAN", "CLEAR", "CLOSE"],
];

const INITIAL_STATE: GameState = {
  board: Array(5).fill(Array(5).fill("")),
  currentRow: 0,
  currentCol: 0,
  gameWords: [],
  input: "",
  message: "",
  gameOver: false,
  hints: 3,
  score: 0,
  streak: 0,
  timeElapsed: 0
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { playSound, toggleMute, getMuteStatus } = useGameSounds();

  useEffect(() => {
    startNewGame();
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  const startNewGame = () => {
    if (timer) clearInterval(timer);
    
    const randomSet = WORDS[Math.floor(Math.random() * WORDS.length)];
    setGameState({
      ...INITIAL_STATE,
      gameWords: randomSet,
      streak: gameState.gameOver ? 0 : gameState.streak
    });

    const newTimer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);

    setTimer(newTimer);
  };

  const calculateScore = (baseScore: number) => {
    const timeBonus = Math.max(0, 300 - gameState.timeElapsed);
    const hintPenalty = (3 - gameState.hints) * 50;
    return baseScore + timeBonus - hintPenalty;
  };

  const handleSubmit = () => {
    if (gameState.input.length !== 5) {
      playSound('wrong');
      setGameState(prev => ({...prev, message: "Please enter a 5-letter word"}));
      return;
    }

    const word = gameState.input.toUpperCase();
    const newBoard = gameState.board.map((row, i) => 
      i === gameState.currentRow ? [...word] : row
    );

    if (gameState.gameWords.includes(word)) {
      const newScore = calculateScore(100);
      const isLastRow = gameState.currentRow === 4;
      
      playSound(isLastRow ? 'victory' : 'correct');
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        input: "",
        message: isLastRow ? "Congratulations! You've completed the game!" : "Correct word found!",
        currentRow: prev.currentRow + 1,
        gameOver: isLastRow,
        score: prev.score + newScore,
        streak: isLastRow ? prev.streak + 1 : prev.streak
      }));

      if (isLastRow && timer) {
        clearInterval(timer);
      }
    } else {
      playSound('wrong');
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        input: "",
        message: "Word not in the list!"
      }));
    }
  };

  const handleHint = () => {
    if (gameState.hints > 0) {
      playSound('hint');
      const currentWord = gameState.gameWords[gameState.currentRow];
      setGameState(prev => ({
        ...prev,
        input: currentWord[0],
        hints: prev.hints - 1,
        message: `Hint: The word starts with "${currentWord[0]}"`
      }));
    }
  };

  const handleKeyPress = (key: string) => {
    playSound('keyPress');
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
            <SoundToggle onToggle={toggleMute} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <GameBoard
            board={gameState.board}
            currentRow={gameState.currentRow}
            input={gameState.input}
            message={gameState.message}
            gameOver={gameState.gameOver}
            score={gameState.score}
            streak={gameState.streak}
            timeElapsed={gameState.timeElapsed}
            hints={gameState.hints}
            onInputChange={(value) => setGameState(prev => ({...prev, input: value}))}
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