"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  children: React.ReactNode;
}

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function Dialog({ children }: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = React.useContext(DialogContext);
  
  return React.cloneElement(React.Children.only(children) as React.ReactElement, {
    onClick: () => setIsOpen(true),
  });
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen } = React.useContext(DialogContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "relative bg-background p-6 rounded-lg shadow-lg max-w-lg w-full mx-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
} 