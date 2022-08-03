import {useEffect} from 'react';

import Home from './Home';
import AddPage from './add/AddPage';
import TagPage from './tags/TagPage';
import CustomerPage from './customers/CustomerPage';
import UserPage from './users/UserPage';
import SearchPage from './search/SearchPage';
import Banner from './Banner';
import UserDialog from './UserDialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {grow, full} from './styles';

import {useUser} from './context/UserContext';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

const appPane = {
  display: 'flex',
  flexDirection: 'column'
};

function App() {

  return (
    <BrowserRouter>
      <UserDialog />
      <Box sx={appPane}>
        <Banner />
        <Box sx={{...grow, ...full}}>
          <Routes>
            <Route path="/tags" element={<TagPage/>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/customers" element={<CustomerPage/>} />
            <Route path="/users" element={<UserPage/>} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;