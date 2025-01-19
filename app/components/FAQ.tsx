"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I play Crosswordle?",
      answer: "Crosswordle combines elements of crossword puzzles and Wordle. You need to guess 5 different 5-letter words. Each word gives you hints for the next ones through color-coded feedback: green for correct letter and position, yellow for correct letter but wrong position."
    },
    {
      question: "What are the different difficulty levels?",
      answer: "There are three difficulty levels: Easy (3 hints, more time bonus), Normal (2 hints, standard scoring), and Hard (1 hint, higher base score but stricter time limit). Choose based on your experience level!"
    },
    {
      question: "How does the scoring system work?",
      answer: "Your score is calculated based on several factors: base points for correct words, time bonus (faster completion = more points), combo multiplier for consecutive correct guesses, and penalties for using hints. The harder the difficulty, the higher the potential score!"
    },
    {
      question: "What are combos and how do they work?",
      answer: "Combos are earned by correctly guessing words in succession. Each correct guess increases your combo multiplier, adding bonus points to your score. Be careful though - an incorrect guess breaks your combo!"
    },
    {
      question: "What are achievements?",
      answer: "Achievements are special rewards for reaching certain milestones, such as: High Scorer (1000+ points), Combo Master (5+ combo), Streak Champion (3+ wins in a row), and Hard Mode Master (800+ points on hard difficulty)."
    },
    {
      question: "How do hints work?",
      answer: "Hints reveal the first letter of the current word. Each difficulty level has a different number of available hints (Easy: 3, Normal: 2, Hard: 1). Using hints will reduce your final score, so use them wisely!"
    },
    {
      question: "What is a perfect game?",
      answer: "A perfect game is achieved by completing all words within 3 minutes without using any hints. This awards you a special 500-point bonus! It's quite challenging but very rewarding."
    },
    {
      question: "Can I play on mobile devices?",
      answer: "Yes! Crosswordle is fully playable on mobile devices. You can use the virtual keyboard provided on screen, which works just like a physical keyboard."
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
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQ; 