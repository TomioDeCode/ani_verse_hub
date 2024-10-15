import Link from "next/link";
import React, { ReactNode } from "react";

type IconProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

const Icon = ({ children, className, href }: IconProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full p-1 transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Icon;
