import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./qq.png";
import "./Navbar.css";

function NavbarLR() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header">
          <div>
            <img src={Logo} width={80} />
          </div>
          <Typography
            color="#e3f2fd"
            variant="h4"
            noWrap
            component="div"
            fontFamily="Roboto"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Quantum Quacks
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarLR;
