import {
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';

import { useEpisode } from '../../hooks/useEpisode';

export const Episode = () => {
  const { id = '' } = useParams();
  const { status, data, error, isFetching } = useEpisode(id);

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
            GOT episode ID - {data.id}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <ul>
              <li>Starting: {data.stars}</li>
              <li>IMDB rating: {data.imDbRating} out of {data.imDbRatingVotes}</li>
              <li>Awards: {data.awards} </li>
              <li>Genres: {data.genres}</li>
              <li>Plot: {data.plot}</li>
              <li>Released: {data.releaseDate}</li>
              <li>Stars: {data.stars}</li>
            </ul>
            {/* {data.tvSeriesInfo.seasons.map((el: any, idx: number) => {
              return (
                <Grid item xs={2} sm={4} md={3} key={idx}>
                  <GOTCard
                    title={`Game of thrones season ${el}`}
                    image={data.image}
                    plot={data.plot}
                    // withFavourite
                    redirectUrl={`/series/${el}`}
                    withLearnMore
                  />
                </Grid>
              );
            })} */}
          </Grid>
        </>
      )}
    </>
  );
};
