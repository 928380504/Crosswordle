"use client";

import { Card } from "@/components/ui/card";

const Footer = () => {
  const links = {
    tools: [
      { name: "Glitch Text Generator", url: "https://glitch-text-generator.org" },
      { name: "Freaky Font", url: "https://freaky-font.org" },
      { name: "Chinese Name Generator", url: "https://chinese-name-generator.org" },
      { name: "Cursed Text Generator", url: "https://cursed-text-generator.org" },
      { name: "Ambigram Generator", url: "https://ambigram-generator.org" },
      { name: "Barbie Font", url: "https://barbie-font.org" },
    ],
    games: [
      { name: "Text Twist", url: "https://text-twist.co" },
      { name: "Text Twist 2", url: "https://text-twist2.co" },
      { name: "Stimulation Clicker", url: "https://stimulation-clicker.org" },
      { name: "Candy Jump", url: "https://candy-jump.com" },
      { name: "Drift Boss", url: "https://www.drift-boss.net" },
      { name: "Crosswordle", url: "https://www.crosswordle.io" },
      { name: "Abgerny", url: "https://www.abgerny.co" },
      { name: "Incredibox Sprunki", url: "https://www.incredibox-sprunki.co" },
      { name: "Crazy Cattle 3D", url: "https://crazy-cattle.cc/" },
    ],
  };

  return (
    <footer className="mt-16 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tools Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              {links.tools.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Games Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Games</h3>
            <div className="grid grid-cols-2 gap-4">
              {links.games.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Crosswordle. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ by the Crosswordle Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 