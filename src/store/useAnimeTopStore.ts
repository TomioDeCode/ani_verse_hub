import { atom, selector } from "recoil";

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface AnimeTop {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
  score: string;
  genres?: Genre[];
}

export interface TopAnimeState {
  topAnimeData: AnimeTop[];
  loading: boolean;
  error: string | null;
}

export const topAnimeStateAtom = atom<TopAnimeState>({
  key: "topAnimeStateAtom",
  default: {
    topAnimeData: [],
    loading: false,
    error: null,
  },
});

export const topAnimeSelector = selector<AnimeTop[]>({
  key: "topAnimeSelector",
  get: ({ get }) => {
    const state = get(topAnimeStateAtom);
    return state.topAnimeData;
  },
});

export const topAnimeLoadingSelector = selector<boolean>({
  key: "topAnimeLoadingSelector",
  get: ({ get }) => {
    const state = get(topAnimeStateAtom);
    return state.loading;
  },
});

export const topAnimeErrorSelector = selector<string | null>({
  key: "topAnimeErrorSelector",
  get: ({ get }) => {
    const state = get(topAnimeStateAtom);
    return state.error;
  },
});

export async function fetchTopAnime(
  setTopAnimeState: (
    valOrUpdater: TopAnimeState | ((currVal: TopAnimeState) => TopAnimeState)
  ) => void
) {
  setTopAnimeState((prevState) => ({
    ...prevState,
    loading: true,
    error: null,
  }));
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/top/anime`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch top anime data");
    }
    const data = await response.json();
    console.log(data);
    if (data && data.data && Array.isArray(data.data)) {
      const formattedData: AnimeTop[] = data.data
        .map((anime: any) => ({
          id: anime.mal_id,
          title: anime.title,
          imageUrl: anime.images.jpg.image_url,
          url: anime.url,
          score: anime.score?.toString() || "N/A",
          genres: anime.genres,
        }))
        .slice(0, 10);
      setTopAnimeState((prevState) => ({
        ...prevState,
        topAnimeData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setTopAnimeState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
