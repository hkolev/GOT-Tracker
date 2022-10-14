import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GOT_SINGLE_SEASON_URL } from '../../services/constants';

export const useSeason = (season: string) => {
  const { status, data, error, isFetching } = useQuery(['season'], async () => {
    const { data } = await axios.get(GOT_SINGLE_SEASON_URL(season));

    return data;
  });

  return { status, data, error, isFetching };
};
