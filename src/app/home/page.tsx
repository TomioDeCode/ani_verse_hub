import HomeTemplate from "@/components/template/home/home.template";
import AnimeTrends from "@/components/fetchers/AnimeTrends";
import React from "react";
import AnimeHistory from "@/components/fetchers/AnimeHistory";

const page = () => {
  return (
    <>
      <HomeTemplate showGreeting={true}>
        <div className="space-y-5">
          <div className="text-secondary">
            <AnimeTrends />
          </div>
          <div className="text-secondary">
            <AnimeHistory />
          </div>
        </div>
      </HomeTemplate>
    </>
  );
};

export default page;
