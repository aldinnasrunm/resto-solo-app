"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";

const pages = ["Home", "About", "Menu", "FAQ", "Testimonial", "Feedback"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const scrollTo = (id: string): void => {
    const menuElement = document.getElementById(id);

    if (menuElement) {
      window.scrollTo({
        top: menuElement.offsetTop - 75,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const [logo, setLogo] = React.useState();

  React.useEffect(() => {
    // Fetch the logo image from the API
    fetch("https://resto-solo-app-production.up.railway.app/api/profile/")
      .then((response) => response.json())
      .then((data) => {
        setLogo(data[0].logo);
      });
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(24, 23, 28, 0.8)",
        backdropFilter: "blur(4px)",
        boxShadow: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 8 }} /> */}
          <Avatar
            src={logo}
            alt="Logo"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              display: { xs: "none", md: "flex" },
              mr: 4,
            }}
            onClick={() => {
              scrollTo("home");
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Resto Solo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => scrollTo(page.toLowerCase())}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      ":hover": {
                        color: "orange",
                        border: "1px solid orange",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            src={logo}
            alt="Logo"
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
            onClick={() => {
              // window.location.href = "/";
              scrollTo("home");
              console.log("clicked");
            }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              window.location.href = "/";
              scrollTo("home");
              console.log("clicked");
            }}
          >
            Resto Solo
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              marginX: "35px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  // scrollTo(page.toLowerCase())
                  // window.location.href = `/${page.toLowerCase()}`;
                  // window.location.href = '/';

                  scrollTo(page.toLowerCase());
                  console.log("clicked");
                }}
                sx={{
                  my: 3,
                  mx: { lg: 2, md: 1 },
                  color: "white",
                  display: "block",
                  ":hover": {
                    color: "orange",
                    border: "1px solid orange",
                    borderRadius: "5px",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
