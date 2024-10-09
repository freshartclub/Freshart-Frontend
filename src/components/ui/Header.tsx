import cn from "../utils/cn";

import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

export const HeaderVariant = cva("", {
  variants: {
    size: {
      "7xl": "text-7xl",
      "6xl": "text-6xl",
      "5xl": "text-5xl",
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      base: "text-base",
    },
    theme: {
      light: "text-text_primary_light",
      dark: "text-text_primary_dark",
      secondary: "text-text_secondary",
    },
    weight: {
      extra_bold: "font-extrabold",
      bold: "font-bold",
      normal: "font-normal",
      light: "font-light",
      semiBold: "font-semibold",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    size: "lg",
    theme: "light",
    weight: "bold",
  },
});

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: VariantProps<typeof HeaderVariant>;
}

const Header = ({ children, className, variant, ...props }: HeaderProps) => {
  return (
    <div className={cn(HeaderVariant(variant), className)} {...props}>
      {children}
    </div>
  );
};

export default Header;
