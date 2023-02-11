import StarIcon from '@mui/icons-material/Star';
import { Badge, Box, Chip, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Restaurant } from '../../assets/interfaces';
import './style.css'

interface Props {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Card className='card'>
      <CardContent>
        <Box marginBottom="1rem" display="flex" alignItems="center" gap="1rem" justifyContent="space-between">
          <Box display="flex" alignItems="center" justifyContent="start" gap="1rem">
          <Avatar
            alt={restaurant.Name}
            src={restaurant.LogoUrl}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="body1" component="div">
            {restaurant.Name}
          </Typography>
          </Box>
          <Chip color="warning" icon={<StarIcon/>} label={`${restaurant.Rating.StarRating}/5`} size="small" />
        </Box>
       
        <Stack direction="row" spacing={1} flexWrap={"wrap"} gap={0.5} justifyContent={"flex-start"}>
          {restaurant.CuisineTypes.map(ct => <Chip key={ct.Id} label={ct.Name} size="small" />)}
        </Stack>
      </CardContent>
    </Card>
  );
}