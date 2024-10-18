import DiscoveryTemplate from "@/components/template/discovery/discovery.template";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return <DiscoveryTemplate>{children}</DiscoveryTemplate>;
};

export default layout;
