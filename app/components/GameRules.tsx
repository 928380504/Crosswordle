"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Brain, 
  Clock, 
  Lightbulb, 
  Keyboard, 
  Target,
  Trophy 
} from "lucide-react";

export default function GameRules() {
  const rules = [
    {
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      title: "Game Objective",
      description: "Find all hidden 5-letter words. Each row represents a different word."
    },
    {
      icon: <Keyboard className="w-6 h-6 text-emerald-500" />,
      title: "Input Method",
      description: "Use your keyboard or the on-screen virtual keyboard to input words. Each word must be 5 letters."
    },
    {
      icon: <Target className="w-6 h-6 text-yellow-500" />,
      title: "Color Hints",
      description: "Green indicates correct letter and position, yellow indicates correct letter but wrong position, gray indicates letter not in word."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-purple-500" />,
      title: "Hint System",
      description: "You have 3 hints per game. Using a hint reveals the first letter of the current word but reduces your final score."
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Time System",
      description: "Game tracks completion time. Faster completion earns higher scores, each second reduces score by 1 point."
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      title: "Scoring Rules",
      description: "Base score 100 points, time bonus up to 300 points, each hint used deducts 50 points. Maintain streaks for higher scores."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Game Rules</CardTitle>
        <CardDescription>
          Learn how to play Crosswordle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] overflow-y-auto pr-4">
          <div className="grid gap-6">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1">{rule.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{rule.title}</h3>
                  <p className="text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}