import { useRecoilState, useRecoilValue } from "recoil";
import { historyStateAtom } from "@/store/atoms/atoms";
import {
  historyAnimeSelector,
  historyLoadingSelector,
  historyErrorSelector,
} from "@/store/selectors/selectors";
import { fetchHistoryAnimeAPI } from "@/util/api";

export function useHistoryAnime() {
  const [state, setState] = useRecoilState(historyStateAtom);
  const historyData = useRecoilValue(historyAnimeSelector);
  const loading = useRecoilValue(historyLoadingSelector);
  const error = useRecoilValue(historyErrorSelector);

  const fetchHistoryAnime = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchHistoryAnimeAPI();

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
    historyData,
    loading,
    error,
    fetchHistoryAnime,
  };
}
