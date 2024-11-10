import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GameRules() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl">How to Play</CardTitle>
        <CardDescription className="text-lg">
          Game Rules & Scoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Basic Rules</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Enter 5-letter words to fill the grid
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Each row must contain a valid word
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Green tiles indicate correct letters
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Yellow tiles indicate correct letters in wrong positions
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Scoring System</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                +100 points for each correct word
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                +50 bonus points for maintaining a streak
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Time bonus: faster completion = more points
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Using hints reduces potential score
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}