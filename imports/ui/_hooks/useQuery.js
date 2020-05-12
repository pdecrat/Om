import qs from 'query-string';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  const query = location.search ? qs.parse(location.search) : {};

  return query;
}

export default useQuery;
