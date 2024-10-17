import {
  recomendedStateAtom,
  searchTermState,
  topAnimeStateAtom,
  trendingStateAtom,
} from "./atoms";
import { AnimeData } from "@/types/AnimeData";
import { historyStateAtom } from "./atoms";
import { selector } from "recoil";

// Fetch Anime Selector
export const fetchAnimeSelector = selector({
  key: "fetchAnimeSelector",
  get: async ({ get }) => {
    const searchTerm = get(searchTermState);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchWithRetry = async (retryCount = 0): Promise<AnimeData[]> => {
      try {
        const response = await fetch(`${API_URL}/anime?q=${searchTerm}`);

        if (response.status === 429) {
          if (retryCount < 5) {
            const delay = Math.pow(2, retryCount) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRetry(retryCount + 1);
          } else {
            throw new Error("Terlalu banyak permintaan. Coba lagi nanti.");
          }
        }

        if (!response.ok) throw new Error("Gagal mengambil data anime.");

        const data = await response.json();
        return data.data.map((item: any) => ({
          mal_id: item.mal_id,
          title: item.title,
          imageUrl: item.images.jpg.image_url,
        }));
      } catch (err) {
        throw err instanceof Error ? err : new Error("Terjadi kesalahan.");
      }
    };

    return fetchWithRetry();
  },
});

// History Anime Selector
export const historyAnimeSelector = selector({
  key: "historyAnimeSelector",
  get: ({ get }) => get(historyStateAtom).historyData,
});

export const historyLoadingSelector = selector({
  key: "historyLoadingSelector",
  get: ({ get }) => get(historyStateAtom).loading,
});

export const historyErrorSelector = selector({
  key: "historyErrorSelector",
  get: ({ get }) => get(historyStateAtom).error,
});

// Recomendations Anime
export const recomendedAnimeSelector = selector<AnimeData[]>({
  key: "recomendedAnimeSelector",
  get: ({ get }) => get(recomendedStateAtom).animeData,
});

export const recomendedLoadingSelector = selector<boolean>({
  key: "recomendedLoadingSelector",
  get: ({ get }) => get(recomendedStateAtom).loading,
});

export const recomendedErrorSelector = selector<string | null>({
  key: "recomendedErrorSelector",
  get: ({ get }) => get(recomendedStateAtom).error,
});

// Top Anime Selector
export const topAnimeSelector = selector<AnimeData[]>({
  key: "topAnimeSelector",
  get: ({ get }) => get(topAnimeStateAtom).topAnimeData,
});

export const topAnimeLoadingSelector = selector<boolean>({
  key: "topAnimeLoadingSelector",
  get: ({ get }) => get(topAnimeStateAtom).loading,
});

export const topAnimeErrorSelector = selector<string | null>({
  key: "topAnimeErrorSelector",
  get: ({ get }) => get(topAnimeStateAtom).error,
});

// Trending Selector
export const trendingSelector = selector<AnimeData[]>({
  key: "trendingSelector",
  get: ({ get }) => get(trendingStateAtom).trendingData,
});

export const trendingLoadingSelector = selector<boolean>({
  key: "trendingLoadingSelector",
  get: ({ get }) => get(trendingStateAtom).loading,
});

export const trendingErrorSelector = selector<string | null>({
  key: "trendingErrorSelector",
  get: ({ get }) => get(trendingStateAtom).error,
});
