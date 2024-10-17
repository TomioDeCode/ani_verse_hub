import { AnimeData } from "@/types/AnimeData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch History Anime
export async function fetchHistoryAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetch(`${API_URL}/watch/episodes`);

    if (!response.ok) {
      throw new Error("Failed to fetch history anime data");
    }

    const data = await response.json();

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected response structure");
    }

    return data.data
      .filter((history: any) => history.region_locked === false)
      .map((history: any) => {
        const anime = history.entry;
        return {
          id: anime.mal_id,
          title: anime.title,
          imageUrl: anime.images.jpg.image_url,
          url: anime.url,
        };
      })
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching history anime data:", error);
    throw new Error("Error fetching history Anime!");
  }
}

// Fetch Recomended Anime
export async function fetchRecommendedAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetch(`${API_URL}/recommendations/anime`);

    if (!response.ok) {
      throw new Error("Failed to fetch recommended anime data");
    }

    const rawData = await response.json();

    if (!rawData?.data || !Array.isArray(rawData.data)) {
      throw new Error("Unexpected response structure");
    }
    if (rawData.data.length === 0) {
      throw new Error("No Anime Recomendations");
    }

    const processedData = rawData.data
      .filter((rec: any) => {
        if (!rec?.entry || !Array.isArray(rec.entry)) {
          return false;
        }
        return true;
      })
      .flatMap((recommendation: any) => {
        const entries = recommendation.entry.map((entry: any) => ({
          id: entry.mal_id,
          title: entry.title,
          imageUrl: entry.images.jpg.image_url,
          url: entry.url,
        }));

        return entries;
      })
      .slice(0, 10);

    if (!processedData.length) {
      throw new Error("No valid anime entries found after processing");
    }

    return processedData;
  } catch (error) {
    throw new Error("Failed to process anime data");
  }
}

// Fetch Top Anime
export async function fetchTopAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetch(`${API_URL}/top/anime`);

    if (!response.ok) {
      throw new Error(`Failed to fetch top anime data: ${response.statusText}`);
    }

    const rawData = await response.json();

    if (!rawData?.data || !Array.isArray(rawData.data)) {
      throw new Error("Unexpected response structure");
    }

    const processedData = rawData.data
      .map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        imageUrl: anime.images.jpg.image_url,
        score: anime.score ? anime.score.toString() : undefined,
        genres: Array.isArray(anime.genres) ? anime.genres : [],
      }))
      .slice(0, 10);

    return processedData;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    throw new Error("Failed to process top anime data");
  }
}

// Fetch Top Anime
export async function fetchTrendingAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetch(
      `${API_URL}/anime?status=airing&min_score=8&max_score=9`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch top anime data: ${response.statusText}`);
    }

    const rawData = await response.json();

    if (!rawData?.data || !Array.isArray(rawData.data)) {
      throw new Error("Unexpected response structure");
    }

    const processedData = rawData.data
      .map((anime: any) => ({
        id: anime.mal_id,
        title: anime.title,
        imageUrl: anime.images.jpg.image_url,
      }))
      .slice(0, 10);

    return processedData;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    throw new Error("Failed to process top anime data");
  }
}
