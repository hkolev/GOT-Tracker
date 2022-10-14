import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GOT_SERIES_URL } from '../../services/constants';

export const useSeries = () => {
  const { status, data, error, isFetching } = useQuery(['series'], async () => {
    const { data } = await axios.get(GOT_SERIES_URL);

    return data;
  });

  return { status, data, error, isFetching };
};
