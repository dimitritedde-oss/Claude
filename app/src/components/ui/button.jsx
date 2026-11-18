import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 font-bold tracking-tight transition-all duration-300 ease-out-soft hover:-translate-y-0.5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:border-primary-hover hover:text-secondary-foreground",
        dark: "bg-secondary text-secondary-foreground border-secondary hover:bg-transparent hover:text-secondary",
        outline:
          "bg-transparent text-foreground border-foreground hover:bg-secondary hover:text-secondary-foreground",
        "outline-light":
          "bg-transparent text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary",
      },
      size: {
        default: "px-7 py-4 text-base",
        sm: "px-5 py-2.5 text-sm",
        lg: "px-8 py-5 text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp data-magnetic="" className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
