import Sidebar from "@/components/shared/Sidebar";
import React from "react";

type HomeProps = {
  children: React.ReactNode;
  showGreeting?: boolean;
};

const HomeTemplate = ({ children, showGreeting = false }: HomeProps) => {
  return (
    <div className="flex h-[100vh] bg-secondary-foreground max-h-[100vh]">
      <aside className="bg-foreground w-[20%] p-3">
        <Sidebar />
      </aside>
      <main
        className={`bg-accent-foreground ${
          showGreeting ? "w-[50%]" : "w-[75%]"
        } p-5`}
      >
        {children}
      </main>
      {showGreeting && (
        <div className="bg-accent-foreground w-[30%] p-6 text-secondary">
          Page
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
