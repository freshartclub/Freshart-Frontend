import cn from "../utils/cn";
import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

export const ParaVariants = cva("", {
  variants: {
    size: {
      base: "text-base",
      small: "text-sm",
      md: "text-md",
    },
    theme: {
      light: "text-text_primary_light",
      dark: "text-text_primary_dark",
      secoundry: "text-text_secondary",
    },
    weight: {
      normal: "font-normal",
      light: "font-light",
      medium: "font-medium",
      semiBold: "font-semibold",
    },
    opacity: {
      faded: "opacity-50",
      mid_fade: "opacity-70",
    },
  },
});

export interface ParaProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: VariantProps<typeof ParaVariants>;
}

const P = ({ children, className, variant, ...props }: ParaProps) => {
  return (
    <div className={cn(ParaVariants(variant), className)} {...props}>
      {children}
    </div>
  );
};

export default P;
