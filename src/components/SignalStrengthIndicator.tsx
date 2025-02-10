
import { FC } from "react";
import { cn } from "@/lib/utils";

interface SignalStrengthIndicatorProps {
  strength: number; // 0-100
  className?: string;
}

export const SignalStrengthIndicator: FC<SignalStrengthIndicatorProps> = ({
  strength,
  className,
}) => {
  const getColor = (strength: number) => {
    if (strength < 33) return "bg-signal-weak";
    if (strength < 66) return "bg-signal-medium";
    return "bg-signal-strong";
  };

  return (
    <div className={cn("flex gap-1 items-end h-6", className)}>
      <div
        className={cn(
          "w-1 rounded-sm transition-all duration-300",
          getColor(strength),
          strength > 0 ? "h-2" : "h-1 opacity-30"
        )}
      />
      <div
        className={cn(
          "w-1 rounded-sm transition-all duration-300",
          getColor(strength),
          strength > 33 ? "h-3" : "h-1 opacity-30"
        )}
      />
      <div
        className={cn(
          "w-1 rounded-sm transition-all duration-300",
          getColor(strength),
          strength > 66 ? "h-4" : "h-1 opacity-30"
        )}
      />
      <div
        className={cn(
          "w-1 rounded-sm transition-all duration-300",
          getColor(strength),
          strength > 90 ? "h-6" : "h-1 opacity-30"
        )}
      />
    </div>
  );
};
