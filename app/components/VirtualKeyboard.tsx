"use client";

import { Button } from "@/components/ui/button";
import { useMemo } from "react";

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
  // 使用 useMemo 缓存按键状态计算
  const keyStates = useMemo(() => {
    const states = new Map<string, 'correct' | 'present' | 'absent' | 'unused' | 'action'>();
    
    // 设置特殊按键
    states.set('ENTER', 'action');
    states.set('BACKSPACE', 'action');
    
    // 检查所有字母的状态
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      // 当前输入中的字母
      if (currentInput.includes(letter)) {
        states.set(letter, 'present');
        return;
      }
      
      // 检查已使用的字母
      let bestState: 'correct' | 'present' | 'absent' | 'unused' = 'unused';
      
      gameWords.forEach((word, wordIndex) => {
        const rowLetters = usedLetters.slice(wordIndex * 5, (wordIndex + 1) * 5);
        const letterIndexInWord = word.indexOf(letter);
        
        if (letterIndexInWord === -1) return;
        
        // 检查字母在当前行是否被使用过
        if (rowLetters.includes(letter)) {
          if (rowLetters[letterIndexInWord] === letter) {
            bestState = 'correct';
          } else if (bestState !== 'correct') {
            bestState = 'present';
          }
        }
      });
      
      if (usedLetters.includes(letter) && bestState === 'unused') {
        bestState = 'absent';
      }
      
      states.set(letter, bestState);
    });

    return states;
  }, [usedLetters, currentInput, gameWords]);

  const getKeyStyle = (key: string) => {
    const state = keyStates.get(key) || 'unused';
    const baseStyle = 'transition-all duration-200 font-semibold text-base';
    
    switch (state) {
      case 'action':
        return `${baseStyle} bg-primary text-primary-foreground hover:bg-primary/90 min-w-[4.5rem]`;
      case 'correct':
        return `${baseStyle} bg-emerald-500 hover:bg-emerald-600 text-white`;
      case 'present':
        return `${baseStyle} bg-yellow-500 hover:bg-yellow-600 text-white`;
      case 'absent':
        return `${baseStyle} bg-muted text-muted-foreground`;
      default:
        return `${baseStyle} bg-secondary hover:bg-secondary/80 text-foreground`;
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
              disabled={
                key === 'ENTER' ? currentInput.length !== 5 :
                key !== 'BACKSPACE' && currentInput.length >= 5
              }
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