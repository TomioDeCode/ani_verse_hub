import { AiOutlinePlayCircle } from "react-icons/ai";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-start items-center space-x-3 transition-transform duration-300 transform hover:scale-105">
      <AiOutlinePlayCircle className="text-2xl text-primary" />{" "}
      <span className="text-secondary text-xl font-bold">ANI VERSEHUB</span>
    </div>
  );
};

export default Logo;
