"use client";
import { useTopAnimeStore } from "@/hooks/useTopAnimeHooks";
import TopCard from "@/components/shared/TopCard";
import React, { useEffect, useRef } from "react";

const AnimeTop = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useTopAnimeStore();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchRecommendedAnime();
      isMounted.current = true;
    }
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <TopCard animeData={animeData} />
    </>
  );
};

export default AnimeTop;
