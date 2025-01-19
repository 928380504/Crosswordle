"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

interface AccordionContextValue {
  value: string[];
  toggle: (itemValue: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  value: [],
  toggle: () => {},
  type: "single",
});

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export function Accordion({
  type = "single",
  collapsible = false,
  defaultValue = [],
  className,
  children,
}: AccordionProps) {
  const [value, setValue] = React.useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [defaultValue].filter(Boolean)
  );

  const toggle = React.useCallback((itemValue: string) => {
    setValue((prev) => {
      if (type === "single") {
        if (collapsible && prev[0] === itemValue) {
          return [];
        }
        return [itemValue];
      }
      
      if (prev.includes(itemValue)) {
        return prev.filter((v) => v !== itemValue);
      }
      return [...prev, itemValue];
    });
  }, [type, collapsible]);

  return (
    <AccordionContext.Provider value={{ value, toggle, type }}>
      <div className={cn("space-y-1", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value: itemValue,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: selectedValues } = React.useContext(AccordionContext);
  const isOpen = selectedValues.includes(itemValue);

  return (
    <AccordionItemContext.Provider value={{ value: itemValue, isOpen }}>
      <div className={cn("border rounded-lg", isOpen && "bg-accent", className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { toggle } = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between py-4 px-5 font-medium transition-all hover:underline",
        className
      )}
      onClick={() => toggle(item.value)}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          item.isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const item = React.useContext(AccordionItemContext);

  if (!item) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        item.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div className="pb-4 pt-0 px-5">{children}</div>
    </div>
  );
}
