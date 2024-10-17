export interface UseAnimeStore {
  animeData: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
  fetchAnimeData: () => Promise<void>;
  setAnimeData: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
}
