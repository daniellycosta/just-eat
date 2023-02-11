import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

interface NavbarProps{
  urlOutcode:string,
}

function Navbar({ urlOutcode}:NavbarProps) {
  const navigate = useNavigate();
  const [postcode, setPostCode] = useState("")

  useEffect(()=>{
    if(urlOutcode){
      setPostCode(urlOutcode)
    }
  },[])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostCode(event.target.value)
  }

  const navigateToCurrentPostCode = ()=>{
    navigate(`/${postcode}/page/1`)
  }

  const handleKeyDown = (event:React.KeyboardEvent)=>{
    if (event.key === 'Enter') {
      event.preventDefault()
      navigateToCurrentPostCode()
    }
  }

  const handleClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigateToCurrentPostCode()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Just Eat
          </Typography>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by postcode"
              inputProps={{ 'aria-label': 'search by postcode' }}
              value={postcode}
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDown}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClickSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
