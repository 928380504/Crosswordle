"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Crosswordle unique?",
      answer: "Crosswordle is a unique word puzzle game that combines the best elements of crossword puzzles and word guessing games. Unlike other word games, Crosswordle challenges you to solve multiple connected words simultaneously, making it both engaging and strategic."
    },
    {
      question: "How do I get better at Crosswordle?",
      answer: "To improve your Crosswordle skills, focus on common 5-letter words, pay attention to letter patterns, and use the color hints strategically. Regular practice with Crosswordle will help you recognize word patterns and improve your vocabulary."
    },
    {
      question: "Can I play Crosswordle on mobile devices?",
      answer: "Yes! Crosswordle is fully optimized for mobile devices. You can enjoy Crosswordle on any device with a web browser. The virtual keyboard makes it easy to play Crosswordle on your smartphone or tablet."
    },
    {
      question: "How does Crosswordle's scoring system work?",
      answer: "Crosswordle's scoring system rewards both accuracy and speed. Each successful word in Crosswordle earns base points, with bonuses for quick completion and maintaining streaks. The unique Crosswordle combo system multiplies your score for consecutive correct guesses."
    },
    {
      question: "What are Crosswordle achievements?",
      answer: "Crosswordle features various achievements to unlock, such as Perfect Game (completing Crosswordle without hints), Speed Master (fast completion), and Streak Champion (maintaining winning streaks). Each achievement in Crosswordle adds to your overall mastery of the game."
    },
    {
      question: "How often are new words added to Crosswordle?",
      answer: "The Crosswordle word database is regularly updated with new, carefully selected 5-letter words. We ensure all words in Crosswordle are common and recognizable, making the game both challenging and enjoyable for players of all skill levels."
    },
    {
      question: "Is there a daily challenge in Crosswordle?",
      answer: "Yes! Crosswordle features a daily challenge mode where all players attempt the same puzzle. This makes Crosswordle perfect for competing with friends and comparing scores on the same set of words."
    },
    {
      question: "How can I share my Crosswordle results?",
      answer: "After completing a Crosswordle puzzle, you can easily share your results with friends. The share feature includes your score, time, and a visual representation of your Crosswordle journey, perfect for social media sharing."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQ; 