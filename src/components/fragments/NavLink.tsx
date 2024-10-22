import React from "react";
import Icon from "../common/Icon";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <div className="rounded-full">
      <Icon className="font-bold text-[25px]">{children}</Icon>
    </div>
  );
};

export default NavLink;
