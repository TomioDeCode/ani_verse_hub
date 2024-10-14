"use client";

import { useTrendAnimeStore } from "@/hooks/useTrendAnimeStore";
import AnimeSwiper from "@/components/fragments/AnimeSwiper";
import React, { useEffect } from "react";

const AnimeTrends = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useTrendAnimeStore();

  useEffect(() => {
    fetchRecommendedAnime();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <AnimeSwiper animeData={animeData} />;
};

export default AnimeTrends;
