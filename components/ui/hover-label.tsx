'use client';

import { cn } from "@/lib/utils";

interface HoverLabelProps {
  text: string;
  show: boolean;
  position?: { x: number; y: number };
  className?: string;
}

export function HoverLabel({ text, show, position, className }: HoverLabelProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg",
        "transition-all duration-200 ease-in-out",
        "pointer-events-none select-none",
        "whitespace-nowrap",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        className
      )}
      style={{
        left: position?.x ? `${position.x}px` : '50%',
        top: position?.y ? `${position.y}px` : '-32px',
        transform: position ? 'none' : 'translateX(-50%)',
      }}
    >
      <span className="relative z-10">{text}</span>
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-900" />
    </div>
  );
} 