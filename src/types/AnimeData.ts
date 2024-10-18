export interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url?: string;
  score?: string;
  genres?: any[];
}

export interface AnimeState {
  data: AnimeData[];
  loading: boolean;
  error: string | null;
}

export interface RawAnimeResponse {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  url?: string;
  score?: number;
  genres?: any[];
}

export interface AnimeEntry {
  entry: RawAnimeResponse;
  region_locked: boolean;
}

export interface RecommendationEntry {
  entry: RawAnimeResponse[];
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
