import HomeTemplate from "@/components/template/home/home.template";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import React from "react";

const animeData = [
  { id: "1", title: "Naruto", imageUrl: "/images/images.jpeg" },
  { id: "2", title: "One Piece", imageUrl: "/images/images.jpeg" },
  { id: "3", title: "Attack on Titan", imageUrl: "/images/images.jpeg" },
  { id: "4", title: "Naruto", imageUrl: "/images/images.jpeg" },
  { id: "5", title: "One Piece", imageUrl: "/images/images.jpeg" },
  { id: "6", title: "Attack on Titan", imageUrl: "/images/images.jpeg" },
];

const page = () => {
  return (
    <>
      <HomeTemplate showGreeting={true}>
        <div className="text-secondary">
          <AnimeSwiper animeData={animeData} />
        </div>
      </HomeTemplate>
    </>
  );
};

export default page;
