"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          className={cn(
            "w-full px-4 py-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200",
            icon && "pl-10",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
