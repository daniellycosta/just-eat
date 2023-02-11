import { useState, useEffect, useMemo } from 'react';
import RestaurantCard from '../../common/RestaurantCard/Index';
import HeaderMap from '../../common/HeaderMap/Index';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { AreaInfo, Restaurant } from '../../assets/interfaces';
import { api } from "../../api/index"
import './style.css'
import { Box, Pagination } from '@mui/material';
import Header from '../../common/Header/Index';

const ITENS_PER_PAGE = 12

interface RestaurantsPageProps {
  postcode: string,
  handleChangePage: Function
  page: number
}

const RestaurantsPage = ({ postcode, page, handleChangePage }: RestaurantsPageProps) => {
  const [areaInfo, setAreaInfo] = useState<AreaInfo>({} as AreaInfo)
  const totalPages = Math.ceil(areaInfo?.Restaurants?.length / ITENS_PER_PAGE);

  useEffect(() => {
    getRestaurantsByPostCode()
  }, [postcode]);

  const getRestaurantsPerPage = (page: number) => {
    if(page > totalPages) handleChangePage({} as React.ChangeEvent<unknown> , 1)

    if (areaInfo.Restaurants?.length) {
      const startIndex = (page - 1) * ITENS_PER_PAGE;
      const endIndex = startIndex + ITENS_PER_PAGE;

      return areaInfo.Restaurants.slice(startIndex, endIndex)
    } else {
      return []
    }

  }

  const getRestaurantObjectWithFilteredCuisines = (restaurant: Restaurant) => {
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
      setAreaInfo({} as AreaInfo)
      return
    }
    const response = await api.get(`/restaurants/bypostcode/${postcode}`)
    const { data } = response
    if (data) {
      const filteredRestaurants = data.Restaurants.filter((rest: Restaurant) => rest.IsOpenNow).map((rest: Restaurant) => getRestaurantObjectWithFilteredCuisines(rest))
      setAreaInfo({
        ...data,
        Postcode: data.MetaData.Postcode,
        ResultCount: data.MetaData.ResultCount,
        Latitude: data.MetaData.Latitude,
        Longitude: data.MetaData.Longitude,
        Restaurants: filteredRestaurants
      })
    } else {
      setAreaInfo({} as AreaInfo)
    }
  }

  const restaurantSlice = useMemo(() => getRestaurantsPerPage(page), [areaInfo.Postcode, page]);

  return (
    <div style={{ marginTop: "2rem", padding: "2rem 1rem" }}>
      <Header area={areaInfo.Area} postcode={areaInfo.Postcode} latitude={areaInfo.Latitude} longitude={areaInfo.Longitude} />
      {!!(areaInfo?.Restaurants?.length) && <>
        <Grid container spacing={2}
          direction="row"
          justifyContent="start"
          alignItems="stretch">
          {
            restaurantSlice.map(rest => (
              <Grid item xs={6} md={3} key={rest.Id}>
                <RestaurantCard restaurant={rest} />
              </Grid>))
          }
        </Grid>
        <Pagination className='pagination' count={totalPages} page={page} onChange={handleChangePage} color="primary" showFirstButton showLastButton />
      </>}
      {!(areaInfo?.Restaurants?.length) && <Paper className='not-found'>
        {!Object.keys(areaInfo)?.length ? (
          <Typography variant='h6'>Use the search box to find restaurants</Typography>
        ) : (
          <>
            <Typography variant='h6'>No Restaurants Found</Typography>
            <Typography variant='body1'>Try again with another postcode</Typography>
          </>
        )}


      </Paper>}
    </div>
  )
}

export default RestaurantsPage
