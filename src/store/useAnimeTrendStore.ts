import { atom, selector } from "recoil";

export interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

export interface TrendState {
  animeData: AnimeData[];
  loading: boolean;
  error: string | null;
}

export const trendStateAtom = atom<TrendState>({
  key: "trendStateAtom",
  default: {
    animeData: [],
    loading: false,
    error: null,
  },
});

export const trendAnimeSelector = selector<AnimeData[]>({
  key: "trendAnimeSelector",
  get: ({ get }) => {
    const state = get(trendStateAtom);
    return state.animeData;
  },
});

export const trendLoadingSelector = selector<boolean>({
  key: "trendLoadingSelector",
  get: ({ get }) => {
    const state = get(trendStateAtom);
    return state.loading;
  },
});

export const trendErrorSelector = selector<string | null>({
  key: "trendErrorSelector",
  get: ({ get }) => {
    const state = get(trendStateAtom);
    return state.error;
  },
});

export async function fetchTrendAnime(
  setTrendState: (
    valOrUpdater: TrendState | ((currVal: TrendState) => TrendState)
  ) => void
) {
  setTrendState((prevState) => ({ ...prevState, loading: true, error: null }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recommendations/anime`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommended anime data");
    }

    const data = await response.json();
    console.log(data)

    if (data && data.data && Array.isArray(data.data)) {
      const recommendations = data.data;
      const formattedData: AnimeData[] = recommendations
        .flatMap((recommendation: any) =>
          recommendation.entry.map((anime: any) => ({
            id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images.jpg.image_url,
            url: anime.url,
          }))
        )
        .slice(0, 10);

      setTrendState((prevState) => ({
        ...prevState,
        animeData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setTrendState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
