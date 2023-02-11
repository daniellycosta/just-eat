import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './common/Navbar/Index';
import RestaurantPage from './components/RestaurantsPage/Index'

function App() {
  const [postcode, setPostCode] = useState<string>("")
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const outcode = params.get("outcode");
  
  useEffect(()=>{
    if(outcode){
      setPostCode(outcode)
    }
  })

  return (
    <>
      <Navbar/>
      <RestaurantPage postcode={postcode}/>
    </>
  )
}

export default App
