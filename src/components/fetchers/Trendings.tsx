"use client";

import { useTrendingAnime } from "@/hooks/useTrending";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import AnimeCard from "@/components/core/AnimeCard";
import { IoMdStar } from "react-icons/io";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { anime, loading, error, fetchTrending } = useTrendingAnime();
  const router = useRouter();

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
        <div onClick={() => router.push(`/home/anime/${id}`)}>
          <AnimeCard
            imageClassName="h-[250px]"
            contentClassName="h-[200px]"
            anime={{ id, title, imageUrl }}
            altText={`Anime cover for ${title}`}
          />
        </div>
      )}
    />
  );
};

export default HomePage;
