"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/50",
        variant === "secondary" &&
          "bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20",
        variant === "outline" &&
          "border border-gray-600 text-gray-300 hover:bg-gray-600/10 hover:border-gray-500",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
