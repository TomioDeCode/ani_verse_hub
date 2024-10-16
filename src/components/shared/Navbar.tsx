import React from "react";
import Title from "../common/Title";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="mt-5 flex flex-col space-y-5 px-4">
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 space-x-4">
        <Title className="text-secondary mt-2.5 font-bold" title="HOME" />
        <div className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-secondary hover:bg-gray-600 transition duration-200">
          <BsBoundingBox size={24} />
        </div>
        <div className="relative">
          <span className="flex items-center justify-center p-2 rounded-full bg-gray-700 text-secondary hover:bg-gray-600 transition duration-200">
            <IoMdNotificationsOutline size={24} />
          </span>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-secondary bg-destructive rounded-full">
            3
          </span>
        </div>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-[40px] h-[40px] rounded-full border-2 border-gray-700"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
