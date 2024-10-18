import CommunityTemplate from "@/components/template/community/community.template";
import React from "react";

type PropsLayout = {
  children: React.ReactNode;
};

const layout = ({ children }: PropsLayout) => {
  return <CommunityTemplate>{children}</CommunityTemplate>;
};

export default layout;
