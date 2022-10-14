import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GOT_SINGLE_EPISODE_URL } from '../../services/constants';

export const useEpisode = (id: string) => {
  const { status, data, error, isFetching } = useQuery(
    ['episode'],
    async () => {
      const { data } = await axios.get(GOT_SINGLE_EPISODE_URL(id));

      return data;
    }
  );

  return { status, data, error, isFetching };
};
