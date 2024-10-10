import React from "react";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <div className="flex items-center justify-start ml-0 mb-2">
      <div className="text-[#807C7C] text-[15px] font-medium">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Title;
