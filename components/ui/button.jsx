import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[16px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-button-gradient hover:bg-button-hover-gradient text-purple-600 border border-white/20 hover:-translate-y-0.5 shadow-sm hover:shadow",
        destructive:
          "bg-red-500/20 text-red-600 hover:bg-red-500/30 border border-red-500/30",
        outline:
          "border border-purple-200/30 bg-white/10 hover:bg-white/20 text-purple-600",
        secondary:
          "bg-violet-500/20 text-violet-600 hover:bg-violet-500/30 border border-violet-500/30",
        ghost: "hover:bg-white/10 text-purple-600",
        link: "text-purple-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[12px] px-3 text-xs",
        lg: "h-11 rounded-[20px] px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
