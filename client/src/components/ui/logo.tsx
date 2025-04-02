import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn(
        "font-marsek tracking-wider",
        sizeClasses[size],
        variant === "white" ? "text-white" : "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
      )}>
        LISTINA
        <sup className={cn("ml-1 font-sans", {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg"
        })}>AI</sup>
      </span>
    </div>
  );
}