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
}

export const GOTCard = ({
  title,
  image,
  plot,
  withLearnMore,
  redirectUrl,
  withFavourite,
  addToFavourite,
}: ICard) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title={title} />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Plot: {plot}
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
            <Favorite />
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
