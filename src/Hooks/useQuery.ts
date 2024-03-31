
import { useLocation } from "react-router-dom";

const useQuery = (): URLSearchParams => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params;
}

export const useSearch = (): string => {
  const params = useQuery();
  return params.get('q') ?? '';
}

export const usePage = (): number => {
  const params = useQuery();
  return Number(params.get('page') ?? 0);
}

export const useLimit = (): number => {
  const params = useQuery();
  return Number(params.get('limit') ?? 0);
}

export default useQuery;