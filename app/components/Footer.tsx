"use client";

import { Card } from "@/components/ui/card";

const Footer = () => {
  const links = {
    tools: [
      { name: "Drift Boss", url: "https://www.drift-boss.net" },
      { name: "Text Twist 2", url: "https://text-twist2.co" },
      { name: "Gamma Emerald", url: "https://gamma-emerald.co" },
      { name: "Candy Clicker", url: "https://candy-clicker.co" },
      { name: "Planet Clicker", url: "https://planet-clicker.co" },
      { name: "Cookie Clicker", url: "https://cookie-clicker.cc" },
      { name: "Capybara Clicker", url: "https://capybara-clicker.co" },
      { name: "Geometry Dash", url: "https://geometry-dash.cc" },
      { name: "Subway Surfers", url: "https://subway-surfers.cc" },
      { name: "Slope Game", url: "https://slope-game.cc" },
    ],
    games: [
      { name: "Snake Games", url: "https://snake-games.com" },
      { name: "BlockBlast Game", url: "https://blockblast-game.cc" },
      { name: "1v1 LOL", url: "https://1v1-lol.cc" },
      { name: "Infinite Craft", url: "https://infinite-craft.cc" },
      { name: "Strands NYT", url: "https://strands-nyt.cc" },
      { name: "Play Pacman", url: "https://play-pacman.com" },
      { name: "Dinosaur Game", url: "https://play-dinosaur-game.com" },
      { name: "Spider Solitaire", url: "https://spider-solitaire-free.com" },
      { name: "Sudoku Online", url: "https://sudoku-online-free.com" },
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