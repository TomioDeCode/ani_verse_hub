import {
  recommendedStateAtom,
  searchTermState,
  topAnimeStateAtom,
  trendingStateAtom,
} from "../atoms/atoms";
import { AnimeData } from "@/types/AnimeData";
import { historyStateAtom } from "../atoms/atoms";
import { selector } from "recoil";

export const fetchAnimeSelector = selector({
  key: "fetchAnimeSelector",
  get: ({ get }) => get(searchTermState),
});

export const historyAnimeSelector = selector({
  key: "historyAnimeSelector",
  get: ({ get }) => get(historyStateAtom).data,
});

export const historyLoadingSelector = selector({
  key: "historyLoadingSelector",
  get: ({ get }) => get(historyStateAtom).loading,
});

export const historyErrorSelector = selector({
  key: "historyErrorSelector",
  get: ({ get }) => get(historyStateAtom).error,
});

export const recommendedAnimeSelector = selector<AnimeData[]>({
  key: "recommendedAnimeSelector",
  get: ({ get }) => get(recommendedStateAtom).data,
});

export const recommendedLoadingSelector = selector<boolean>({
  key: "recommendedLoadingSelector",
  get: ({ get }) => get(recommendedStateAtom).loading,
});

export const recommendedErrorSelector = selector<string | null>({
  key: "recommendedErrorSelector",
  get: ({ get }) => get(recommendedStateAtom).error,
});

export const topAnimeSelector = selector<AnimeData[]>({
  key: "topAnimeSelector",
  get: ({ get }) => get(topAnimeStateAtom).data,
});

export const topAnimeLoadingSelector = selector<boolean>({
  key: "topAnimeLoadingSelector",
  get: ({ get }) => get(topAnimeStateAtom).loading,
});

export const topAnimeErrorSelector = selector<string | null>({
  key: "topAnimeErrorSelector",
  get: ({ get }) => get(topAnimeStateAtom).error,
});

export const trendingSelector = selector<AnimeData[]>({
  key: "trendingSelector",
  get: ({ get }) => get(trendingStateAtom).data,
});

export const trendingLoadingSelector = selector<boolean>({
  key: "trendingLoadingSelector",
  get: ({ get }) => get(trendingStateAtom).loading,
});

export const trendingErrorSelector = selector<string | null>({
  key: "trendingErrorSelector",
  get: ({ get }) => get(trendingStateAtom).error,
});
