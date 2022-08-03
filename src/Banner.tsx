import {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import rallyOnion from '../assets/rally_onion.svg';

import {grow} from './styles';

const Banner = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SvgIcon component={rallyOnion} sx={{fontSize: '48px', paddingTop: '4px'}}></SvgIcon>
        <Typography variant="h5" sx={{ ...grow}}>Rally Hugs</Typography>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Customers</MenuItem>
          <MenuItem onClick={handleClose}>Tags</MenuItem>
          <MenuItem onClick={handleClose}>Users</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;