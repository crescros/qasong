import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Badge,
} from "@material-ui/core"
import VideoSearch from "./VideoSearch/VideoSearch"
import EnvironmentBadges from "./EnvironmentBadges/EnvironmentBadges"
import MoreIcon from "@material-ui/icons/MoreVert"
import QueueMusicIcon from "@material-ui/icons/QueueMusic"

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

export default function PrimarySearchAppBar({
  handleSearchTermInput,
  handleSubmitVideoSearch,
  showQueue,
  setShowQueue,
  queue,
}) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
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
      <MenuItem onClick={handleMenuClose}>Join Us</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
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
      {/* Mobile Github icon */}
      <MenuItem
        onClick={() => {
          open("https://github.com/callbacc/Artistify", "_blank")
        }}
      >
        <IconButton color="inherit">
          <img
            src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-1.png&r=255&g=255&b=255"
            height="32px"
          />
        </IconButton>
        <p>GitHub</p>
      </MenuItem>

      {/* Discord icon mobile onClick={handleProfileMenuOpen}*/}
      <MenuItem
        onClick={() => {
          open("https://discord.gg/b2gEwT8", "_blank")
        }}
      >
        <IconButton target="_blank">
          <img
            src="https://discord.com/assets/28174a34e77bb5e5310ced9f95cb480b.png"
            height="32px"
          />
        </IconButton>
        <p>Discord</p>
      </MenuItem>

      {/* QUEUE */}
      <MenuItem onClick={() => setShowQueue(!showQueue)}>
        <IconButton target="_blank" color={showQueue ? "secondary" : "inherit"}>
          <Badge badgeContent={queue.length} color="secondary">
            <QueueMusicIcon style={{ fontSize: "40px" }} />
          </Badge>
        </IconButton>
        <p>Queue</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* Icon-logo */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Artistify logo"
          >
            <img src=".\icon-logo.svg" height="48px" />
          </IconButton>
          {/* Development Badge */}
          <EnvironmentBadges />

          {/* Artistify name from frontend .env */}
          <Typography display="inline" style={{ marginRight: "20px" }}>
            {process.env.REACT_APP_NAME}
          </Typography>
          {/* Search bar */}
          <VideoSearch
            handleSearchTermInput={handleSearchTermInput}
            handleSubmitVideoSearch={handleSubmitVideoSearch}
          />
          <div className={classes.grow} />
          {/* Desktop Github Icon  */}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              color={showQueue ? "secondary" : "inherit"}
              onClick={() => setShowQueue(!showQueue)}
              target="_blank"
            >
              <Badge badgeContent={queue.length} color="secondary">
                <QueueMusicIcon style={{ fontSize: "40px" }} />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              href="https://github.com/callbacc/Artistify"
              target="_blank"
            >
              <img
                src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-1.png&r=255&g=255&b=255"
                height="32px"
              />
            </IconButton>

            {/* Discord icon desktop */}
            <IconButton
              edge="end"
              color="inherit"
              href="https://discord.gg/b2gEwT8"
              target="_blank"
            >
              <img
                src="https://discord.com/assets/28174a34e77bb5e5310ced9f95cb480b.png"
                height="32px"
              />
            </IconButton>
          </div>

          {/* More Icon/button */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={queue.length} color="secondary">
                <MoreIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
