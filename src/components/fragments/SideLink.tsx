"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icon from "../common/Icon";

type SideLinkProps = {
  href: string;
  text: string;
  children: React.ReactNode;
};

const SideLink = ({ children, href, text }: SideLinkProps) => {
  const pathName = usePathname();
  const isActive = href === pathName;

  return (
    <div>
      <Link
        href={href}
        className={`flex items-center space-x-3 p-1 rounded-lg transition-all duration-300 
              ${
                isActive
                  ? "text-primary bg-gray-800 shadow-lg"
                  : "text-secondary hover:bg-gray-700"
              }
              capitalize font-medium`}
      >
        <Icon className="font-bold text-[25px]" href="#">{children}</Icon>
        <span className="text-[15px]">{text}</span>
      </Link>
    </div>
  );
};

export default SideLink;
