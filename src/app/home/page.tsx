import HomeTemplate from "@/components/template/home/home.template";
import AnimeRecomended from "@/components/fetchers/AnimeRecomended";
import AnimeHistory from "@/components/fetchers/AnimeHistory";
import AnimeTrends from "@/components/fetchers/AnimeTrends";
import React from "react";

const page = () => {
  return (
    <>
      <HomeTemplate showGreeting={true}>
        <div className="flex flex-col items-center mt-3 space-y-5 overflow-y-auto overflow-x-hidden max-h-[90vh] h-[90vh] max-w-[100%]">
          <div className="text-secondary">
            <AnimeTrends />
          </div>
          <div className="text-secondary">
            <AnimeHistory />
          </div>
          <div className="text-secondary">
            <AnimeRecomended />
          </div>
        </div>
      </HomeTemplate>
    </>
  );
};

export default page;
