import { Box, Typography } from "@mui/material";
import HeaderMap from "../HeaderMap/Index";

interface HeaderProps {
  area: string,
  postcode: string,
  latitude:number,
  longitude:number
}

const Header = ({ area, postcode, latitude, longitude }: HeaderProps) => {

  return (
    <Box display="flex" alignItems="center" marginBottom="1rem">
      <Box display="flex" alignItems="baseline" style={{ position: "absolute", zIndex: 500 }}>
        <Typography data-cy="header-title" variant='h3' margin={0}>{area ?? "Welcome to Just Eat!"}</Typography>
        {postcode && <Typography variant="h6" margin={0}>{postcode}</Typography>}
      </Box>

      <HeaderMap latitude={latitude ?? 51.528308} longitude={longitude ?? -0.3817834} displayMarker={!!(latitude && longitude)}/>  
    </Box>
  )
}

export default Header