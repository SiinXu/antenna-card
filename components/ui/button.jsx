import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "bg-button-purple-gradient text-purple-800 border border-purple-200/50",
        destructive:
          "bg-button-blue-gradient text-blue-800 border border-blue-200/50",
        outline:
          "bg-button-indigo-gradient text-indigo-800 border border-indigo-200/50",
        secondary:
          "bg-button-purple-gradient text-purple-800 border border-purple-200/50",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-14 rounded-md px-8",
        icon: "h-9 w-9",
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
