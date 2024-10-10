import HomeTemplate from "@/components/template/home/home.template";
import React from "react";

const page = () => {
  return (
    <>
      <HomeTemplate showGreeting={true}>
        <div className="text-secondary">
          Page
        </div>
      </HomeTemplate>
    </>
  )
};

export default page;
