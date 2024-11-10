"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Gamepad2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface GameModeProps {
  onSelectMode: (isDaily: boolean) => void;
  canPlayDaily: boolean;
  nextChallengeTime: Date | null;
}

export default function GameMode({ 
  onSelectMode, 
  canPlayDaily,
  nextChallengeTime 
}: GameModeProps) {
  return (
    <div className="grid gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">选择游戏模式</h2>
        <p className="text-muted-foreground">
          选择每日挑战或自由练习模式
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          variant={canPlayDaily ? "default" : "outline"}
          disabled={!canPlayDaily}
          onClick={() => onSelectMode(true)}
          className="h-32 flex flex-col items-center gap-2"
        >
          <Calendar className="w-8 h-8" />
          <div>
            <div className="font-semibold">每日挑战</div>
            <div className="text-sm">
              {canPlayDaily 
                ? "今日挑战可用" 
                : `下次挑战: ${formatDistanceToNow(nextChallengeTime!)}`
              }
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => onSelectMode(false)}
          className="h-32 flex flex-col items-center gap-2"
        >
          <Gamepad2 className="w-8 h-8" />
          <div>
            <div className="font-semibold">自由练习</div>
            <div className="text-sm">
              无限次练习，提升技巧
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
} 