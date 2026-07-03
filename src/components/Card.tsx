"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-glass backdrop-blur-glass border border-blue-500/10 rounded-2xl p-6 shadow-glass hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
