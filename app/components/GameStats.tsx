"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, BarChart2, Clock, Star } from "lucide-react";

interface GameStatsProps {
  stats: {
    highScore: number;
    gamesPlayed: number;
    longestStreak: number;
    averageTime?: number;
    totalHintsUsed?: number;
    perfectGames?: number;
  };
}

export default function GameStats({ stats }: GameStatsProps) {
  const achievements = [
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Perfect Game",
      description: "Complete game without using hints",
      progress: stats.perfectGames || 0,
      target: 10,
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Speed Star",
      description: "Complete game within 3 minutes",
      progress: Math.min(stats.averageTime || 0, 180),
      target: 180,
      inverse: true,
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-500" />,
      title: "Streak Master",
      description: "Achieve longest winning streak",
      progress: stats.longestStreak,
      target: 5,
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Game Master",
      description: "Total games completed",
      progress: stats.gamesPlayed,
      target: 50,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BarChart2 className="w-4 h-4" />
          Stats
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Game Statistics</DialogTitle>
          <DialogDescription>
            View your game performance and achievements
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          {/* Basic Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.highScore}
              </div>
              <div className="text-sm text-muted-foreground">High Score</div>
            </div>
            <div className="bg-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Achievements</h4>
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  {achievement.icon}
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                </div>
                <Progress 
                  value={achievement.inverse 
                    ? ((achievement.target - achievement.progress) / achievement.target) * 100
                    : (achievement.progress / achievement.target) * 100
                  } 
                  className="h-2"
                />
                <div className="text-sm text-right text-muted-foreground">
                  {achievement.progress} / {achievement.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 