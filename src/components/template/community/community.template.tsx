import Sidebar from "@/components/shared/Sidebar";
import React from "react";

type CommunityTemplateProps = {
  children: React.ReactNode;
};

const CommunityTemplate = ({ children }: CommunityTemplateProps) => {
  return (
    <div className="flex h-[100vh] justify-center bg-secondary-foreground max-h-screen">
      <aside className="bg-foreground w-[20%] p-3">
        <Sidebar />
      </aside>
      <main className="bg-accent-foreground w-[80%] p-5">{children}</main>
    </div>
  );
};

export default CommunityTemplate;
