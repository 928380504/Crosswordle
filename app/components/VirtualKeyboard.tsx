"use client";

import { Button } from "@/components/ui/button";

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: string[];
  currentInput: string;
  gameWords: string[];
}

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export default function VirtualKeyboard({ 
  onKeyPress, 
  usedLetters, 
  currentInput,
  gameWords 
}: VirtualKeyboardProps) {
  const getKeyState = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'action';
    }

    if (currentInput.includes(key)) {
      return 'current';
    }

    if (gameWords.includes(key)) {
      return 'used';
    }

    if (usedLetters.includes(key)) {
      return 'correct';
    }

    return 'available';
  };

  const getKeyStyle = (key: string) => {
    const state = getKeyState(key);
    
    const baseStyle = 'transition-all duration-200 font-semibold text-base';
    
    switch (state) {
      case 'action':
        return `${baseStyle} bg-primary text-primary-foreground hover:bg-primary/90 min-w-[80px]`;
      case 'current':
        return `${baseStyle} bg-blue-500 hover:bg-blue-600 text-white`;
      case 'used':
        return `${baseStyle} bg-yellow-500 hover:bg-yellow-600 text-yellow-950 dark:bg-yellow-500/80 dark:hover:bg-yellow-500/90 dark:text-yellow-950`;
      case 'correct':
        return `${baseStyle} bg-emerald-500 hover:bg-emerald-600 text-emerald-950 dark:bg-emerald-500/80 dark:hover:bg-emerald-500/90 dark:text-emerald-950`;
      default:
        return `${baseStyle} bg-muted hover:bg-muted/80 text-foreground`;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border">
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5 mb-1.5">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${getKeyStyle(key)} h-14 px-3 sm:px-4`}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}