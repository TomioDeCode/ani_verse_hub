import { atom } from "recoil";

import {
  AnimeData,
  HistoryState,
  RecomendedState,
  TopAnimeState,
  TrendingState,
} from "@/types/AnimeData";

export const animeDataState = atom<AnimeData[]>({
  key: "animeDataState",
  default: [],
});

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: true,
});

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});

export const currentPageState = atom<number>({
  key: "currentPageState",
  default: 1,
});

export const searchTermState = atom<string>({
  key: "searchTermState",
  default: "",
});

export const historyStateAtom = atom<HistoryState>({
  key: "historyStateAtom",
  default: {
    historyData: [],
    loading: false,
    error: null,
  },
});

export const recomendedStateAtom = atom<RecomendedState>({
  key: "recomendedStateAtom",
  default: {
    animeData: [],
    loading: false,
    error: null,
  },
});

export const topAnimeStateAtom = atom<TopAnimeState>({
  key: "topAnimeStateAtom",
  default: {
    topAnimeData: [],
    loading: false,
    error: null,
  },
});

export const trendingStateAtom = atom<TrendingState>({
  key: "trendingStateAtom",
  default: {
    trendingData: [],
    loading: false,
    error: null,
  },
});
