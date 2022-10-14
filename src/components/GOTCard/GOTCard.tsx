import { Favorite } from '@mui/icons-material';
import {
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Card,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ICard {
  title: string;
  image: string;
  plot: string;
  withLearnMore?: true;
  redirectUrl?: string;
  withFavourite?: boolean;
  addToFavourite?(): void;
  imDbRating?: string;
  isFavourite?: boolean;
}

export const GOTCard = ({
  title,
  image,
  plot,
  imDbRating,
  withLearnMore,
  redirectUrl,
  withFavourite,
  addToFavourite,
  isFavourite,
}: ICard) => {
  const navigate = useNavigate();
  console.log(isFavourite);
  return (
    <Card>
      <CardHeader title={title} />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>IMDB rating:</b> {imDbRating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Plot:</b> {plot}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {withFavourite && (
          <IconButton aria-label="add to favorites" onClick={addToFavourite}>
            <Favorite {...(isFavourite ? { style: { fill: 'red' } } : {})} />
          </IconButton>
        )}

        {withLearnMore && (
          <Button
            size="small"
            onClick={() => redirectUrl && navigate(redirectUrl)}
          >
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
