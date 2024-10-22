import React from "react";

type PropsLayout = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsLayout) => {
  return <div className="!bg-foreground">{children}</div>;
};

export default Layout;
