import React, { ReactNode } from "react";

type IconProps = {
  children: ReactNode;
  className?: string;
};

const Icon = ({ children, className }: IconProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full p-1 transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Icon;
