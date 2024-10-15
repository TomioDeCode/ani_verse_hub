import { atom, selector } from "recoil";

export interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

export interface RecomendedState {
  animeData: AnimeData[];
  loading: boolean;
  error: string | null;
}

export const recomendedStateAtom = atom<RecomendedState>({
  key: "recomendedStateAtom",
  default: {
    animeData: [],
    loading: false,
    error: null,
  },
});

export const recomendedAnimeSelector = selector<AnimeData[]>({
  key: "recomendedAnimeSelector",
  get: ({ get }) => {
    const state = get(recomendedStateAtom);
    return state.animeData;
  },
});

export const recomendedLoadingSelector = selector<boolean>({
  key: "recomendedLoadingSelector",
  get: ({ get }) => {
    const state = get(recomendedStateAtom);
    return state.loading;
  },
});

export const recomendedErrorSelector = selector<string | null>({
  key: "recomendedErrorSelector",
  get: ({ get }) => {
    const state = get(recomendedStateAtom);
    return state.error;
  },
});

export async function fetchRecomendedAnime(
  setRecomendedState: (
    valOrUpdater:
      | RecomendedState
      | ((currVal: RecomendedState) => RecomendedState)
  ) => void
) {
  setRecomendedState((prevState) => ({
    ...prevState,
    loading: true,
    error: null,
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recommendations/anime`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommended anime data");
    }

    const data = await response.json();
    console.log(data);

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

      setRecomendedState((prevState) => ({
        ...prevState,
        animeData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setRecomendedState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
