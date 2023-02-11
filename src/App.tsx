import { Paper } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './common/Navbar/Index';
import RestaurantPage from './components/RestaurantsPage/Index'

function App() {
  const [postcode, setPostCode] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate();
  
  const { outcode, pageNumber } = useParams();
    
  useEffect(()=>{
    if(outcode){
      setPostCode(outcode)
    }

    if(pageNumber){
      setPage(Number(pageNumber))
    }
  })

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number)=>{
    setPage(value);
    navigate(`/${postcode}/page/${value}`)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar urlOutcode={outcode ?? ""}/>
      <RestaurantPage postcode={postcode} page={page} handleChangePage={handleChangePage}/>
    </>
  )
}

export default App
