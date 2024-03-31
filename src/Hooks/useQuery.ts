
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

export const usePage = (): string => {
  const params = useQuery();
  return params.get('page') ?? '';
}

export const useLimit = (): string => {
  const params = useQuery();
  return params.get('limit') ?? '';
}

export default useQuery;