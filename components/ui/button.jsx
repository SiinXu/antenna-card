import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[16px] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-button-gradient hover:bg-button-hover-gradient text-purple-500 border border-white/20 hover:-translate-y-0.5",
        destructive:
          "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 hover:-translate-y-0.5",
        outline:
          "border border-purple-200/30 bg-white/10 hover:bg-white/20 text-purple-500 hover:-translate-y-0.5",
        secondary:
          "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 border border-violet-500/20 hover:-translate-y-0.5",
        ghost: "hover:bg-white/10 text-purple-500 hover:-translate-y-0.5",
        link: "text-purple-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-[12px] px-4 text-xs",
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
