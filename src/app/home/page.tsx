import HomeTemplate from "@/components/template/home/home.template";
import AnimeTrends from "@/components/fetchers/AnimeTrends";
import React from "react";

const page = () => {
  return (
    <>
      <HomeTemplate showGreeting={true}>
        <div className="text-secondary">
          <AnimeTrends />
        </div>
      </HomeTemplate>
    </>
  );
};

export default page;
