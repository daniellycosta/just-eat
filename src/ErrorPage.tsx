import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box id="error-page" display="flex" height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h2">Oops!</Typography>
      <Typography variant="body1">Sorry, an unexpected error has occurred:  <i>{error.statusText || error.message}</i></Typography>
      
      <Link href="/">Click here to go back to home</Link>
    </Box>
  );
}