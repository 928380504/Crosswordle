"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SoundToggleProps {
  onToggle: () => boolean;
  initialMuted?: boolean;
}

export default function SoundToggle({ onToggle, initialMuted = false }: SoundToggleProps) {
  const [isMuted, setIsMuted] = useState(initialMuted);

  const handleToggle = () => {
    const newMutedState = onToggle();
    setIsMuted(newMutedState);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="h-10 w-10"
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
      <span className="sr-only">Toggle sound</span>
    </Button>
  );
}