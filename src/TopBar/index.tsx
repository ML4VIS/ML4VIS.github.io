import React from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Badge,
  InputBase,
} from "@material-ui/core";
import {
  // AccountCircle,
  // Notifications as NotificationsIcon,
  // Mail as MailIcon,
  Menu as MenuIcon,
  // Search as SearchIcon,
  CloudUpload,
  Description,
  GitHub
} from "@material-ui/icons";

import { useStyles } from "./style";

interface Props {
  menuId: string;
  handleDrawerToggle: () => void;
  onProfileMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
}

export function TopBar(props: Props) {
  const classes = useStyles();
  const { menuId, onProfileMenuOpen, handleDrawerToggle } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          ML4VIS
        </Typography>

        <div className={classes.sectionDesktop}>
          {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            edge="end"
            aria-label="link to arxiv paper"
            aria-haspopup="true"
            onClick={()=>window.open("https://arxiv.org/abs/2012.00467")}
            color="inherit"
          >
            <Description /> <span style={{fontSize: '12px'}}>Preprint </span>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="link to github homepage"
            aria-haspopup="true"
            onClick={()=>window.open("https://github.com/ML4VIS/ML4VIS.github.io")}
            color="inherit"
          >
            <GitHub /> <span style={{fontSize: '12px'}}>{' '}Github </span>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="suggest new ML4VIS papers for this survey"
            aria-haspopup="true"
            onClick={()=>window.open("https://github.com/ML4VIS/ML4VIS.github.io/issues/new?assignees=&labels=enhancement&template=suggest-new-ml4vis-papers.md&title=Suggest+Paper%3A+%5Bpaper+title%5D")}
            color="inherit"
          >
            <CloudUpload />  <span style={{fontSize: '12px'}}> {' '}Contribute </span>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
