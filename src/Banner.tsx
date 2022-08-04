import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  SvgIcon,
  IconButton,
  Menu,
  MenuItem,
} from '@mineral/core';
import { Link } from 'react-router-dom';

// @ts-ignore
import rallyOnion from '../assets/rally_hug_onion.svg';

import { grow } from './styles';

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
        <Typography variant="h5" sx={{ ...grow }}>
          Rally Hugs
        </Typography>
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
          <MenuItem onClick={handleClose}>
            <Link to="/customers">Customers</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>Tags</MenuItem>
          <MenuItem onClick={handleClose}>Users</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
