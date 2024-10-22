import { atom } from "recoil";
import { AnimeData, AnimeState, AnimeDetailsGlo } from "@/types/AnimeData";

export const globalLoadingState = atom<boolean>({
  key: "globalLoadingState",
  default: false,
});

export const globalErrorState = atom<string | null>({
  key: "globalErrorState",
  default: null,
});

export const animeDataState = atom<AnimeData[]>({
  key: "animeDataState",
  default: [],
});

export const animeDataDetailsState = atom<AnimeDetailsGlo[] | null>({
  key: "animeDataDetailsState",
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

export const debouncedSearchState = atom<string>({
  key: "debouncedSearchState",
  default: "",
});

export const historyStateAtom = atom<AnimeState>({
  key: "historyStateAtom",
  default: {
    data: [],
    loading: false,
    error: null,
  },
});

export const recommendedStateAtom = atom<AnimeState>({
  key: "recommendedStateAtom",
  default: {
    data: [],
    loading: false,
    error: null,
  },
});

export const topAnimeStateAtom = atom<AnimeState>({
  key: "topAnimeStateAtom",
  default: {
    data: [],
    loading: false,
    error: null,
  },
});

export const trendingStateAtom = atom<AnimeState>({
  key: "trendingStateAtom",
  default: {
    data: [],
    loading: false,
    error: null,
  },
});

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  sender?: string;
}

export const chatMessagesState = atom<ChatMessage[]>({
  key: "chatMessagesState",
  default: [],
});

export const socketConnectionState = atom<boolean>({
  key: "socketConnectionState",
  default: false,
});
