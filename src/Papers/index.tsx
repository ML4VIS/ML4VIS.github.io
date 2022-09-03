import React from "react";
import {
  Grid,
  Paper,
  Card,
  Button,
  CardActions,
  Avatar,
  Chip,
  CardContent,
  Typography,
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Paper as TPaper, getAvatar } from "../index";
import { useStyles } from "./style";

interface Props {
  papers: TPaper[];
}

export function Papers(props: Props) {
  const { papers } = props;
  const classes = useStyles();
  const onClickPaper = (paper: TPaper)=>{
    window.open(
      paper.url||`https://www.google.com/search?q=${paper.name.replace(' ', '+')}`, 
      "_blank")
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {papers.map((paper, i) => (
            <Grid key={i} item>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent} onClick={()=> onClickPaper(paper)}>
                  {/* <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {paper.venue} {paper.year}
                  </Typography> */}
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.title}
                  >
                    {paper.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {paper.venue} {paper.year}
                  </Typography>
                  {/* <Typography variant="body2" component="p">
                    Author1, Author2, Author3, and Author4
                  </Typography> */}
                  <div className={classes.grow}></div>
                  <div className={classes.tags}>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.VIS.map((v) => (
                      // <Avatar key={v} className={classes.VISTag}>
                      //   {getAvatar(v)}
                      // </Avatar>
                      <Avatar key={v} className={classes.VISTag} src={`assets/avatars/${v.replace(' ', '_')}_w.png`} />
                    ))}
                  </AvatarGroup>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.ML.map((m) => (
                      <Avatar key={m} className={classes.MLTag}>
                        <b>{getAvatar(m)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  </div>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
