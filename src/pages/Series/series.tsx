import {
  Typography,
  Grid,
  CircularProgress,
  CardActionArea,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { GOTCard } from '../../components/GOTCard';
import { useSeries } from '../../hooks/useSeries';

export const Series = () => {
  const { status, data, error, isFetching } = useSeries();

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
            GOT series
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.tvSeriesInfo.seasons.map((el: any, idx: number) => {
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
            })}
          </Grid>
        </>
      )}
    </>
  );
};
