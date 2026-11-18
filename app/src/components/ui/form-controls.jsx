import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";

const fieldBase =
  "w-full rounded-[14px] border-2 border-transparent bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-none";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
Label.displayName = "Label";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input type={type} ref={ref} className={cn(fieldBase, className)} {...props} />
));
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

// Native select: accessible out of the box and gives the right picker on phones.
const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(fieldBase, "cursor-pointer", className)} {...props}>
    {children}
  </select>
));
Select.displayName = "Select";

export { Label, Input, Textarea, Select };
