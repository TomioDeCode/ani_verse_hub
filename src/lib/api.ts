import {
  AnimeData,
  RawAnimeResponse,
  AnimeEntry,
  RecommendationEntry,
} from "@/types/AnimeData";

interface APIResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  MAX_RETRIES: 5,
  ITEMS_PER_PAGE: 10,
  DEFAULT_HEADERS: {
    Accept: "application/json",
  },
} as const;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

async function fetchWithRetry<T>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
    });

    if (response.status === 429 && retryCount < API_CONFIG.MAX_RETRIES) {
      const backoffDelay = Math.pow(2, retryCount) * 1000;
      await delay(backoffDelay);
      return fetchWithRetry(endpoint, options, retryCount + 1);
    }

    if (!response.ok) {
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError(
      `Failed to fetch from ${endpoint}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      undefined,
      endpoint
    );
  }
}

const processAnimeData = (anime: RawAnimeResponse): AnimeData => ({
  id: anime.mal_id,
  title: anime.title,
  imageUrl: anime.images.jpg.image_url,
  url: anime.url,
  score: anime.score?.toString(),
  genres: Array.isArray(anime.genres) ? anime.genres : [],
});

export async function fetchHistoryAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetchWithRetry<APIResponse<AnimeEntry[]>>(
      "/watch/episodes"
    );

    return response.data
      .filter((history) => !history.region_locked)
      .map((history) => processAnimeData(history.entry))
      .slice(0, API_CONFIG.ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Error in fetchHistoryAnimeAPI:", error);
    throw new APIError("Failed to fetch anime history");
  }
}

export async function fetchRecommendedAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetchWithRetry<APIResponse<RecommendationEntry[]>>(
      "/recommendations/anime"
    );

    const processedData = response.data
      .filter((rec) => rec?.entry && Array.isArray(rec.entry))
      .flatMap((recommendation) => recommendation.entry.map(processAnimeData))
      .slice(0, API_CONFIG.ITEMS_PER_PAGE);

    if (!processedData.length) {
      throw new APIError("No recommendations available");
    }

    return processedData;
  } catch (error) {
    console.error("Error in fetchRecommendedAnimeAPI:", error);
    throw new APIError("Failed to fetch anime recommendations");
  }
}

export async function fetchTopAnimeAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetchWithRetry<APIResponse<RawAnimeResponse[]>>(
      "/top/anime"
    );

    return response.data
      .map(processAnimeData)
      .slice(0, API_CONFIG.ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Error in fetchTopAnimeAPI:", error);
    throw new APIError("Failed to fetch top anime");
  }
}

export async function fetchTrendingAPI(): Promise<AnimeData[]> {
  try {
    const response = await fetchWithRetry<APIResponse<RawAnimeResponse[]>>(
      "/anime?status=airing&min_score=8&max_score=9"
    );

    return response.data
      .map(processAnimeData)
      .slice(0, API_CONFIG.ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Error in fetchTrendingAPI:", error);
    throw new APIError("Failed to fetch trending anime");
  }
}

export async function searchAnime(searchTerm: string): Promise<AnimeData[]> {
  try {
    const response = await fetchWithRetry<APIResponse<RawAnimeResponse[]>>(
      `/anime?q=${encodeURIComponent(searchTerm)}`
    );

    return response.data.map(processAnimeData);
  } catch (error) {
    console.error("Error in searchAnime:", error);
    throw new APIError("Failed to search anime");
  }
}
