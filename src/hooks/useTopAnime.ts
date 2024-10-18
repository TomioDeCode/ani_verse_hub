import { useRecoilState, useRecoilValue } from "recoil";
import { topAnimeStateAtom } from "@/store/atoms/atoms";
import {
  topAnimeErrorSelector,
  topAnimeLoadingSelector,
  topAnimeSelector,
} from "@/store/selectors/selectors";
import { fetchTopAnimeAPI } from "@/util/api";

export function useTopAnime() {
  const [state, setState] = useRecoilState(topAnimeStateAtom);
  const anime = useRecoilValue(topAnimeSelector);
  const loading = useRecoilValue(topAnimeLoadingSelector);
  const error = useRecoilValue(topAnimeErrorSelector);

  const fetchTopAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchTopAnimeAPI();

      setState((prev) => ({
        ...prev,
        data: data || [],
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error ? err.message : "An unexpected error occurred",
        loading: false,
        data: [],
      }));
    }
  };

  return {
    anime,
    loading,
    error,
    fetchTopAnime,
  };
}
