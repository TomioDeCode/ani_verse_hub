import { atom, selector } from "recoil";

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Trending {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
  score: string;
  genres?: Genre[];
}

export interface TrendingState {
  trendingData: Trending[];
  loading: boolean;
  error: string | null;
}

export const trendingStateAtom = atom<TrendingState>({
  key: "trendingStateAtom",
  default: {
    trendingData: [],
    loading: false,
    error: null,
  },
});

export const trendingSelector = selector<Trending[]>({
  key: "trendingSelector",
  get: ({ get }) => {
    const state = get(trendingStateAtom);
    return state.trendingData;
  },
});

export const trendingLoadingSelector = selector<boolean>({
  key: "trendingLoadingSelector",
  get: ({ get }) => {
    const state = get(trendingStateAtom);
    return state.loading;
  },
});

export const trendingErrorSelector = selector<string | null>({
  key: "trendingErrorSelector",
  get: ({ get }) => {
    const state = get(trendingStateAtom);
    return state.error;
  },
});

export async function fetchTrending(
  setTrendingState: (
    valOrUpdater: TrendingState | ((currVal: TrendingState) => TrendingState)
  ) => void
) {
  setTrendingState((prevState) => ({
    ...prevState,
    loading: true,
    error: null,
  }));
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anime?status=airing&min_score=8&max_score=9`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch trend anime data");
    }
    const data = await response.json();
    if (data && data.data && Array.isArray(data.data)) {
      const formattedData: Trending[] = data.data
        .map((anime: any) => ({
          id: anime.mal_id,
          title: anime.title,
          imageUrl: anime.images.jpg.image_url,
          url: anime.url,
          score: anime.score?.toString() || "N/A",
          genres: anime.genres,
        }))
        .slice(0, 10);
      setTrendingState((prevState) => ({
        ...prevState,
        trendingData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setTrendingState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
