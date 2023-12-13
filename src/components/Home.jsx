import React from 'react'
import SwipeDrawer from './SwipeDrawer'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Archives from './archive/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Notes from './note/Notes';


const Home = () => {
  return (
    <Box style={{ display: 'flex', width: '100%' }}>
    <Router>
        <SwipeDrawer />
        <Routes>        
            <Route path='/' element={<Notes />} />
            <Route path='/archive' element={<Archives />} />
            <Route path='/delete' element={<DeleteNotes />} />
        </Routes>
    </Router>
</Box>
  )
}

export default Home