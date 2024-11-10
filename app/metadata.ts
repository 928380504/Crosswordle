const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crosswordle.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Play Crosswordle - Daily Brain Games | New Puzzle Every Day',
  description: 'Challenge your mind with Crosswordle, the addictive blend of Crossword and Wordle. Solve daily puzzles, compete with friends, and track your progress. Join thousands of word lovers today!',
  keywords: 'cross, wordle, game, puzzle, play, guess, solve, daily, grid, answers, today',
  openGraph: {
    title: 'Play Crosswordle - Daily Brain Games',
    description: 'Challenge your mind with Crosswordle - the addictive word puzzle game',
    images: ['/og-image.jpg'],
    url: siteUrl,
    type: 'website',
    siteName: 'Crosswordle',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Crosswordle - Daily Brain Games',
    description: 'Challenge your mind with Crosswordle - the addictive word puzzle game',
    images: ['/og-image.jpg'],
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
}; 