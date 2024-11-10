"use client";

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface SoundToggleProps {
  onToggle: (isMuted: boolean) => void;
}

export default function SoundToggle({ onToggle }: SoundToggleProps) {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onToggle(newMutedState);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="w-10 h-10"
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
}