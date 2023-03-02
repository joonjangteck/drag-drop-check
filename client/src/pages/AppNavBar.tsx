import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Access Cosmos", href: "/cosmos" },
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
      <Box sx={{ m: 10, mt: 12 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppNavBar;
