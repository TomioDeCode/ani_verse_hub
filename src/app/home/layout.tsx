import HomeTemplate from "@/components/template/home/home.template";
import React from "react";

type PropsLayout = {
  children: React.ReactNode;
};

const layout = ({ children }: PropsLayout) => {
  return (
    <>
      <div className="">{children}</div>
    </>
  );
};

export default layout;
