import React from "react";
import SideLink from "../fragments/SideLink";
import Title from "../common/Title";
import Logo from "../common/Logo";

import { BsCompass, BsClock, BsFolder2Open, BsDownload } from "react-icons/bs";
import { AiOutlineHome, AiOutlineDiscord } from "react-icons/ai";
import { TbSettings, TbHelpHexagon, TbLogout } from "react-icons/tb";
import { Button } from "../ui/button";

const NavBox = () => {
  return (
    <nav className="mt-5 flex flex-col space-y-5 px-4">
      <Logo />
      <div className="space-y-2">
        <Title className="text-[#807C7C] font-medium" title="HOME" />
        <SideLink href="/home" text="Home">
          <AiOutlineHome className="text-lg" />
        </SideLink>
        <SideLink href="/discovery" text="Discovery">
          <BsCompass className="text-lg" />
        </SideLink>
        <SideLink href="/community" text="Community">
          <AiOutlineDiscord className="text-lg" />
        </SideLink>
      </div>
      <div className="space-y-2">
        <Title className="text-[#807C7C] font-medium" title="LIBRARY" />
        <SideLink href="/recent" text="Recent">
          <BsClock className="text-lg" />
        </SideLink>
        <SideLink href="/collection" text="My Collection">
          <BsFolder2Open className="text-lg" />
        </SideLink>
        <SideLink href="/download" text="Download">
          <BsDownload className="text-lg" />
        </SideLink>
      </div>
      <hr className="border-t border-gray-600 my-2" />
      <div className="space-y-2">
        <SideLink href="/settings" text="Settings">
          <TbSettings className="text-lg" />
        </SideLink>
        <SideLink href="/help" text="Help">
          <TbHelpHexagon className="text-lg" />
        </SideLink>
      </div>
      <div className="">
        <Button className="mt-1 w-full py-2 flex items-center justify-center space-x-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300">
          <TbLogout className="text-lg" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavBox;
