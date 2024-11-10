"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

const TUTORIAL_STEPS = [
  {
    title: "Welcome to Crosswordle!",
    content: "Crosswordle combines the best of crossword puzzles and Wordle into an exciting word game. Let's learn how to play!",
    image: "https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Game Board",
    content: "The game board consists of a 5x5 grid. Your goal is to fill each row with valid 5-letter words that match the hidden answers.",
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Word Entry",
    content: "Use the virtual keyboard or your physical keyboard to type words. Press Enter to submit your guess, and the tiles will change color to give you feedback.",
    image: "https://images.unsplash.com/photo-1659782629770-fd1e7314f6e2?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Color Feedback",
    content: "Green tiles mean the letter is correct and in the right position. Yellow tiles mean the letter exists in the word but in a different position. Gray tiles mean the letter isn't in the word.",
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Hints and Scoring",
    content: "You have 3 hints available per game. Using hints will reduce your potential score. Complete words quickly and maintain your streak for bonus points!",
    image: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?w=800&auto=format&fit=crop&q=60"
  }
];

export default function GameTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TUTORIAL_STEPS.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const TutorialContent = () => (
    <div className="space-y-6">
      <div className="relative h-64 overflow-hidden rounded-lg">
        <img
          src={TUTORIAL_STEPS[currentStep].image}
          alt={TUTORIAL_STEPS[currentStep].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">
          {TUTORIAL_STEPS[currentStep].title}
        </h3>
        <p className="text-lg text-center px-4">
          {TUTORIAL_STEPS[currentStep].content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={nextStep}
          disabled={currentStep === TUTORIAL_STEPS.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Fixed Help Button */}
      <Button
        variant="outline"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={() => setIsModalOpen(true)}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* Collapsible Tutorial */}
      <Card className="bg-card border-border">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-6 hover:bg-transparent"
        >
          <span className="text-2xl font-bold">How to Play</span>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </Button>
        {isExpanded && (
          <CardContent className="pt-0">
            <TutorialContent />
          </CardContent>
        )}
      </Card>

      {/* Modal Tutorial */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-card relative">
            <Button
              variant="ghost"
              className="absolute right-4 top-4"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </Button>
            <CardContent className="pt-6">
              <TutorialContent />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}