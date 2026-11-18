import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 font-bold tracking-tight transition-all duration-300 ease-out-soft active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:border-primary-hover",
        outline:
          "bg-transparent text-foreground border-foreground/70 hover:bg-foreground hover:text-background hover:border-foreground",
        ghost: "border-transparent bg-muted text-foreground hover:bg-foreground/15",
      },
      size: {
        default: "px-7 py-4 text-base",
        sm: "px-5 py-2.5 text-sm",
        lg: "px-9 py-5 text-lg",
        icon: "size-12 p-0",
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
