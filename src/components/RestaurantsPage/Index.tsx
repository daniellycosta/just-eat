import { useState, useEffect } from 'react';
import RestaurantCard from '../../common/RestaurantCard/Index';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Restaurant } from '../../assets/interfaces';
import { api } from "../../api/index"
import './style.css'

interface RestaurantsPageProps {
  postcode: string
}

function RestaurantsPage({ postcode }: RestaurantsPageProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    getRestaurantsByPostCode()
  }, [postcode]);


  const getRestaurantObjectWithFilteredCuisines = (restaurant:Restaurant) => {
    const cuisineSet = new Set<number>()

    const filteredCuisineType = restaurant.CuisineTypes.filter((ct: { Id: number }) => {
      const duplicatedCuisineType = cuisineSet.has(ct.Id);
      cuisineSet.add(ct.Id);
      return !duplicatedCuisineType;
    });

    return ({
      ...restaurant,
      CuisineTypes: filteredCuisineType
    })
  }

  const getRestaurantsByPostCode = async () => {
    if (!postcode) {
      setRestaurants([])
      return
    }
    const response = await api.get(`/restaurants/bypostcode/${postcode}`)
    const { data } = response
    if (data) {
      const filteredRestaurants = data.Restaurants.filter((rest:Restaurant) => rest.IsOpenNow).map((rest:Restaurant) => getRestaurantObjectWithFilteredCuisines(rest))
      setRestaurants(filteredRestaurants)
    } else {
      setRestaurants([])
    }
  }

  return (
    <>
      {!!restaurants.length && <Grid container spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="stretch" style={{ marginTop: "2rem", padding: "2rem 1rem" }}>
        {
          restaurants.map(rest => (
            <Grid item xs={6} md={3} key={rest.Id}>
              <RestaurantCard restaurant={rest} />
            </Grid>))
        }
      </Grid>}
      {!restaurants.length && <Paper>
        <Typography variant='h6'>Empty</Typography>
      </Paper>}

    </>
  )
}

export default RestaurantsPage
