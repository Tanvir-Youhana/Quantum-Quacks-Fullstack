import React, { useState, setState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "./qq.png";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MarketHoliday from "./MarketHoliday";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import instance from "../axios";
import { useParams } from "react-router-dom";
import cts from "check-ticker-symbol";
import Swal from "sweetalert2";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [input, setInput] = React.useState("");
  const { ticker } = useParams();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    // sessionStorage.removeItem("accessToken");

    window.location.href = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* onClick={handleMenuClose} */}
      <MenuItem component={Link} to="/setting">
        Setting
      </MenuItem>
      <MenuItem onClick={logout}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  let history = useHistory();
  const getTicker = () => {
    if (!cts.valid(input)) {
      Swal.fire({ icon: "error", title: "Invalid ticker! Please try again." });
      return;
    }
    const ticker = input.toUpperCase();
    history.push("/chart/" + ticker + "");
  };

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
            fontFamily="Roboto"
            noWrap
            component="div"

            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Quantum Quacks
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Stack spacing={2} direction="row">
            <Button
              disabled={!input}
              type="submit"
              onClick={getTicker}
              variant="contained"
            >
              Search
            </Button>
            {/* <Button variant="contained" component={Link} to="/marketHoliday">
              Market Holiday
            </Button>
            <Button variant="contained" component={Link} to="/EarningCalendar">
              Earning Calendar
            </Button>
            <Button variant="contained" component={Link} to="/IPOcalendar">
              IPO Calendar
            </Button>
            <Button variant="contained" component={Link} to="/TrendingStock">
              Trending Stock
            </Button>
            */}
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/Home"
            >
              Home
            </Button>
            <Button 
              color="success"
              variant="contained"
              component={Link}
              to="/marketHoliday"
            >
              Market Holiday
            </Button> 
            
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/TrendingStock"
            >
              Trending Stock
            </Button>
            <Button
              size="large"
              color="success"
              variant="contained"
              component={Link}
              to="/EarningCalendar"
            >
              Earning Calendar
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/IPOcalendar"
            >
              IPO Calendar
              Home
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default Navbar;
