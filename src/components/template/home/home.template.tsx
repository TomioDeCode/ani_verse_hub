import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

type HomeProps = {
  children: React.ReactNode;
  showGreeting?: boolean;
};

const HomeTemplate = ({ children, showGreeting = false }: HomeProps) => {
  return (
    <div className="flex h-[100vh] justify-center bg-secondary-foreground max-h-screen">
      <aside className="bg-foreground w-[20%] p-3">
        <Sidebar />
      </aside>
      <main
        className={`bg-accent-foreground p-5 ${
          showGreeting ? "flex-grow-[2]" : "flex-grow"
        }`}
      >
        {children}
      </main>
      {showGreeting && (
        <div className="bg-foreground flex-grow text-secondary">
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
