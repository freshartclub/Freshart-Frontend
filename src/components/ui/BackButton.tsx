import React, { HTMLProps } from "react";
import backbtn from "../../assets/back_svgrepo.com.png";
import cn from "../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconClass: HTMLProps<HTMLElement>["className"];
}

const BackButton = ({
  className,
  children,
  iconClass,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn("flex gap-2 text-base", className)} {...props}>
      <img src={backbtn} alt="backbtn" className={iconClass} />
      <span className="leading-[25px]">{children}</span>
    </button>
  );
};

export default BackButton;
