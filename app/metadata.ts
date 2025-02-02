const DOMAIN = 'www.crosswordle.io';
const SITE_URL = `https://${DOMAIN}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Play Crosswordle - Daily Brain Games | New Puzzle Every Day',
  description: 'Challenge your mind with Crosswordle, the addictive blend of Crossword and Wordle. Solve daily puzzles, compete with friends, and track your progress. Join thousands of word lovers today!',
  keywords: 'cross, wordle, game, puzzle, play, guess, solve, daily, grid, answers, today',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: '🎯 Crosswordle - The Ultimate Word Puzzle Challenge',
    description: '🎮 Blend Crossword & Wordle into one addictive game! Daily puzzles, high scores, and friendly competition. Start your word adventure now!',
    siteName: 'Crosswordle',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Crosswordle - The Ultimate Word Puzzle Game',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎯 Crosswordle - Play The Ultimate Word Puzzle Game',
    description: '🎮 Challenge yourself with a perfect blend of Crossword & Wordle! New puzzles daily, compete with friends, and become a word master.',
    images: [`${SITE_URL}/twitter-image.png`],
    creator: '@crosswordle',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  alternates: {
    canonical: SITE_URL,
  },
}; 