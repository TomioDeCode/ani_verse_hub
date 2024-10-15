import { atom, selector } from "recoil";

interface AnimeHistory {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

export interface HistoryState {
  historyData: AnimeHistory[];
  loading: boolean;
  error: string | null;
}

export const historyStateAtom = atom<HistoryState>({
  key: "historyStateAtom",
  default: {
    historyData: [],
    loading: false,
    error: null,
  },
});

export const historyAnimeSelector = selector<AnimeHistory[]>({
  key: "historyAnimeSelector",
  get: ({ get }) => {
    const state = get(historyStateAtom);
    return state.historyData;
  },
});

export const historyLoadingSelector = selector<boolean>({
  key: "historyLoadingSelector",
  get: ({ get }) => {
    const state = get(historyStateAtom);
    return state.loading;
  },
});

export const historyErrorSelector = selector<string | null>({
  key: "historyErrorSelector",
  get: ({ get }) => {
    const state = get(historyStateAtom);
    return state.error;
  },
});

export async function fetchHistoryAnime(
  setHistoryState: (
    valOrUpdater: HistoryState | ((currVal: HistoryState) => HistoryState)
  ) => void
) {
  setHistoryState((prevState) => ({
    ...prevState,
    loading: true,
    error: null,
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/watch/episodes`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch history anime data");
    }

    const data = await response.json();
    console.log(data);

    if (data && data.data && Array.isArray(data.data)) {
      const formattedData: AnimeHistory[] = data.data
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
      setHistoryState((prevState) => ({
        ...prevState,
        historyData: formattedData,
        loading: false,
      }));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    setHistoryState((prevState) => ({
      ...prevState,
      error: err instanceof Error ? err.message : "An error occurred",
      loading: false,
    }));
  }
}
