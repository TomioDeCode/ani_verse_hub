import AnimeTop from "@/components/fetchers/AnimeTop";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

type HomeTemplateProps = {
  children: React.ReactNode;
  showGreeting?: boolean;
  className?: string;
};

const HomeTemplate = ({
  children,
  showGreeting = false,
  className,
}: HomeTemplateProps) => {
  return (
    <div
      className={`flex h-[100vh] justify-center bg-secondary-foreground max-h-screen ${className}`}
    >
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
          <div>
            <Navbar />
          </div>
          <div>
            <AnimeTop />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
