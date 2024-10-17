interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
  score?: string;
  genres?: Genre[];
}

export interface HistoryState {
  historyData: AnimeData[];
  loading: boolean;
  error: string | null;
}

export interface RecomendedState {
  animeData: AnimeData[];
  loading: boolean;
  error: string | null;
}

export interface TopAnimeState {
  topAnimeData: AnimeData[];
  loading: boolean;
  error: string | null;
}

export interface TrendingState {
  trendingData: AnimeData[];
  loading: boolean;
  error: string | null;
}
