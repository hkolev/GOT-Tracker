import { Typography, Grid, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';

import { GOTCard } from '../../components/GOTCard';
import { useSeason } from '../../hooks/useSeason';

interface ISingleEpisode {
  title: string;
  image: string;
  plot: string;
  id: string;
}

export const Season = () => {
  const { season = '' } = useParams();
  const { data, isFetching } = useSeason(season);

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
              ({ title, image, plot, id }: ISingleEpisode, idx: number) => {
                return (
                  <Grid item xs={2} sm={4} md={3} key={idx}>
                    <GOTCard
                      title={title}
                      image={image}
                      plot={plot}
                      withLearnMore
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
