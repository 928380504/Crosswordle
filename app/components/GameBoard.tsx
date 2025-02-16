"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, Zap, Trophy, RefreshCcw } from "lucide-react";
import { CellState, CellStateType } from "../types/game";
import VirtualKeyboard from './VirtualKeyboard';
import ShareGame from './ShareGame';

interface GameBoardProps {
  board: string[][];
  gameWords: string[];
  currentRow: number;
  input: string;
  message: string;
  gameOver: boolean;
  score: number;
  streak: number;
  timeElapsed: number;
  hints: number;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onHint: () => void;
  onNewGame: () => void;
  onKeyPress: (key: string) => void;
}

export default function GameBoard({
  board,
  gameWords,
  currentRow,
  input,
  message,
  gameOver,
  score,
  streak,
  timeElapsed,
  hints,
  onInputChange,
  onSubmit,
  onHint,
  onNewGame,
  onKeyPress
}: GameBoardProps) {
  const [cellStates, setCellStates] = useState<CellState[][]>([]);

  useEffect(() => {
    const states: CellState[][] = board.map((row, rowIndex) =>
      row.map((letter, colIndex) => {
        if (!letter) {
          return { letter: "", state: "empty" as CellStateType };
        }
        
        const word = gameWords[rowIndex];
        if (!word) {
          return { letter, state: "empty" as CellStateType };
        }

        if (word[colIndex] === letter) {
          return { letter, state: "correct" as CellStateType };
        }
        
        if (word.includes(letter)) {
          const letterCount = row.slice(0, colIndex + 1)
            .filter(l => l === letter).length;
          const targetCount = word.split('')
            .filter(l => l === letter).length;
          
          if (letterCount <= targetCount) {
            return { letter, state: "present" as CellStateType };
          }
        }

        return { letter, state: "absent" as CellStateType };
      })
    );

    setCellStates(states);
  }, [board, gameWords]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      if (e.key === 'Enter') {
        onSubmit();
      } else if (e.key === 'Backspace') {
        onInputChange(input.slice(0, -1));
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key) && input.length < 5) {
        onKeyPress(e.key);
        onInputChange((input + e.key).toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input, gameOver, onSubmit, onInputChange, onKeyPress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVirtualKeyPress = (key: string) => {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      onSubmit();
    } else if (key === 'BACKSPACE') {
      onInputChange(input.slice(0, -1));
    } else if (input.length < 5) {
      const newInput = (input + key).toUpperCase();
      onKeyPress(key);
      onInputChange(newInput);
    }
  };

  const handleSubmit = () => {
    if (input.length !== 5) {
      onInputChange("Please enter a 5-letter word");
      return;
    }

    onSubmit();
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full flex justify-end gap-4 text-base text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>{score} pts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            <span>Streak: {streak}</span>
          </div>
        </div>

        <div className="grid gap-1.5 w-full max-w-2xl mx-auto">
          {cellStates.map((row, i) => (
            <div key={i} className="flex gap-3 justify-center">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`w-[4.5rem] h-[4.5rem] flex items-center justify-center text-2xl font-bold rounded-lg border-2 
                    transition-all duration-300
                    ${i === currentRow ? "border-primary animate-pulse" : "border-border"}
                    ${cell.state === 'correct' ? "bg-emerald-600 text-emerald-50" :
                      cell.state === 'present' ? "bg-yellow-600 text-yellow-50" :
                      cell.state === 'absent' ? "bg-muted text-muted-foreground" : "bg-card"}`}
                >
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm space-y-2">
          <div className="h-12 flex items-center justify-center">
            <div className="text-2xl font-semibold bg-muted/30 px-6 py-2 rounded-lg min-w-[150px] text-center">
              {input || "Type your word"}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={onHint}
              disabled={gameOver || hints === 0}
              variant="outline"
              className="px-4 py-2"
            >
              Hint ({hints})
            </Button>
            <Button
              onClick={onSubmit}
              disabled={gameOver || input.length !== 5}
              className="bg-primary hover:bg-primary/90 px-6 py-2"
            >
              Submit
            </Button>
            <Button
              onClick={onNewGame}
              variant="outline"
              className="px-4 py-2"
              title="Start New Game"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>

          {message && (
            <div className="flex justify-center">
              <div className={`text-base font-medium ${
                message.includes('Correct') ? 'text-emerald-500' : 
                message.includes('Congratulations') ? 'text-emerald-500' : 
                'text-red-500'
              }`}>
                {message}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl mx-auto mt-2">
          <VirtualKeyboard
            onKeyPress={handleVirtualKeyPress}
            usedLetters={[]}
            currentInput={input}
            gameWords={gameWords}
          />
        </div>
      </div>
    </Card>
  );
}