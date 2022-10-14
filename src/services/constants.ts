const DEFAUL_URL = 'https://imdb-api.com/en/API';
const API_KEY = 'k_x0hhhcqn';

const GOT_ID = 'tt0944947';

export const STORAGE_USERS_KEY = 'users';
export const STORAGE_CURRENT_USER = 'current_user';

export const GOT_SERIES_URL = `${DEFAUL_URL}/Title/${API_KEY}/${GOT_ID}`;
export const GOT_SINGLE_SEASON_URL = (season: string) =>
  `${DEFAUL_URL}/SeasonEpisodes/${API_KEY}/${GOT_ID}/${season}`;
export const GOT_SINGLE_EPISODE_URL = (episode: string) =>
  `${DEFAUL_URL}/Title/${API_KEY}/${episode}`;
