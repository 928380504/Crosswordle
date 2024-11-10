"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

export function Dialog({ children, ...props }: DialogProps) {
  const [open, setOpen] = React.useState(props.open || false);

  return (
    <DialogContext.Provider
      value={{
        open,
        onOpenChange: (newOpen) => {
          setOpen(newOpen);
          props.onOpenChange?.(newOpen);
        },
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, ...props }: { children: React.ReactNode }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  return React.cloneElement(React.Children.only(children) as React.ReactElement, {
    onClick: () => onOpenChange(true),
    ...props,
  });
}

export function DialogContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "relative bg-background p-6 rounded-lg shadow-lg max-w-lg w-full mx-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
} 