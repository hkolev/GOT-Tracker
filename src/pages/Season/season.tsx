import { Typography, Grid, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GOTCard } from '../../components/GOTCard';
import { useSeason } from '../../hooks/useSeason';
import {
  STORAGE_CURRENT_USER,
  STORAGE_USERS_KEY,
} from '../../services/constants';

interface ISingleEpisode {
  title: string;
  image: string;
  plot: string;
  id: string;
  imDbRating: string;
}

export const Season = () => {
  const { season = '' } = useParams();
  const { data, isFetching } = useSeason(season);
  const getUsers = localStorage.getItem(STORAGE_USERS_KEY);
  const getLoggedUser = localStorage.getItem(STORAGE_CURRENT_USER);
  const parsedUsers = JSON.parse(getUsers!);
  const parsedLoggedUser = JSON.parse(getLoggedUser!);
  const currentUser = parsedUsers.filter(
    (el: any) => el.email === parsedLoggedUser.email
  )[0];
  const [currentFavourites, setFavourites] = useState(currentUser.favourites);

  const addToFavourite = (id: string) => {
    const updatedUsers: any = [];

    setFavourites([...currentFavourites, id]);

    parsedUsers.forEach((el: any) => {
      if (el.email === currentUser.email) {
        updatedUsers.push({
          ...el,
          favourites: currentUser.favourites.includes(id)
            ? currentUser.favourites.filter((el: string) => el !== id)
            : [...currentUser.favourites, id],
        });
      } else {
        updatedUsers.push(el);
      }
    });

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
  };

  return (
    <>
      {isFetching ? (
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            gutterBottom
          >
            GOT season {season}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.episodes.map(
              (
                { title, image, plot, id, imDbRating }: ISingleEpisode,
                idx: number
              ) => {
                return (
                  <Grid item xs={2} sm={4} md={3} key={idx}>
                    <GOTCard
                      title={title}
                      image={image}
                      plot={plot}
                      withLearnMore
                      withFavourite
                      isFavourite={currentFavourites.includes(id)}
                      addToFavourite={() => {
                        addToFavourite(id);
                      }}
                      imDbRating={imDbRating}
                      redirectUrl={`/episode/${id}`}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </>
      )}
    </>
  );
};
