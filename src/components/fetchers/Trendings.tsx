"use client";

import { useTopAnime } from "@/hooks/useTrendingHooks";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import { IoMdStar } from "react-icons/io";
import React, { useEffect } from "react";

const Trendings = () => {
  const { anime, loading, error, fetchTrending } = useTopAnime();

  useEffect(() => {
    fetchTrending();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AnimeSwiper
      data={anime}
      title="Trending"
      icon={<IoMdStar size={25} />}
      renderCard={({ id, title, imageUrl }) => (
        <AnimeCard
          imageClassName="h-[250px]"
          contentClassName="h-[200px]"
          anime={{ id, title, imageUrl }}
          altText={`Anime cover for ${title}`}
        />
      )}
    />
  );
};

export default Trendings;
