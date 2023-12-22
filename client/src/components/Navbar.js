import React, { useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setDrawerOpen(false);
  };

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <div>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={`Welcome, ${user?.user}!`} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout} component={NavLink} to="/login">
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <nav className="flex justify-between items-center p-4 bg-slate-600">
        <div className="flex items-center">
          <Button onClick={toggleDrawer} sx={{ color: 'white' }}>
            Open Sidebar
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
