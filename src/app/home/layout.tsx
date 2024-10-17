import React from "react";

type PropsLayout = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsLayout) => {
  return <div className="">{children}</div>;
};

export default Layout;
