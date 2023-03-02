import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet, Link } from "react-router-dom";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Hourly Utilization", href: "/hourly" },
];

const AppNavBar = () => {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            TESTING
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link to={item.href} key={item.href} style={{ textDecoration: "none", color: "white", margin: "10px" }}>
                {item.text}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 10 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppNavBar;
