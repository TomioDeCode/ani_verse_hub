import { atom, selector } from "recoil";

interface AnimeTrend {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

export interface TrendAnimeState {
  trendAnimeData: AnimeTrend[];
  loading: boolean;
  error: string | null;
}

export const trendAnimeStateAtom = atom<TrendAnimeState>({
  key: "trendAnimeStateAtom",
  default: {
    trendAnimeData: [],
    loading: false,
    error: null,
  },
});

export const trendAnimeSelector = selector<AnimeTrend[]>({
  key: "trendAnimeSelector",
  get: ({ get }) => {
    const state = get(trendAnimeStateAtom);
    return state.trendAnimeData;
  },
});

export const trendAnimeLoadingSelector = selector<boolean>({
  key: "trendAnimeLoadingSelector",
  get: ({ get }) => {
    const state = get(trendAnimeStateAtom);
    return state.loading;
  },
});

export const trendAnimeErrorSelector = selector<string | null>({
  key: "trendAnimeErrorSelector",
  get: ({ get }) => {
    const state = get(trendAnimeStateAtom);
    return state.error;
  },
});

export async function fetchTrendAnime(
  setTrendAnimeState: (
    valOrUpdater:
      | TrendAnimeState
      | ((currVal: TrendAnimeState) => TrendAnimeState)
  ) => void
) {
  setTrendAnimeState((prevState) => ({
    ...prevState,
    loading: true,
    error: null,
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/top/anime`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trend anime data");
    }

    const data = await response.json();

    if (data && data.data && Array.isArray(data.data)) {
      const formattedData: AnimeTrend[] = data.data
        .map((anime: any) => ({
          id: anime.mal_id,
          title: anime.title,
          imageUrl: anime.images.jpg.image_url,
          url: anime.url,
        }))
        .slice(0, 10);
      setTrendAnimeState((prevState) => ({
        ...prevState,
        trendAnimeData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setTrendAnimeState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
