import React from "react";

type TitleProps = {
  title: string;
  className: string;
};

const Title = ({ title, className }: TitleProps) => {
  return (
    <div className="flex items-center justify-start ml-0 mb-2">
      <div className={`${className} text-[15px]`}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Title;
