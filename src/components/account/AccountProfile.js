import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Link,
  Typography
} from '@material-ui/core';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const user = {
  avatar: '/static/images/avatars/mahesh_4.jpg',
  city: 'Mumbai',
  country: 'India',
  jobTitle: 'Senior Developer',
  name: 'Mahesh Bodas',
  timezone: 'GMT+5:30'
};

export default function AccountProfile() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography>
        <Divider/>
        </Box>
        <br />
        <br />
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
        >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          If you like to hire me
        </Typography>
        <Typography variant="h5" component="h2">
          Contact{bull}me
        </Typography>
      </Box>
      <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
      >
      </Box>
      </CardContent>
      <CardActions>
        <ListItemIcon>
            <TwitterIcon fontSize="small" />&nbsp;&nbsp;
            <Link href="https://twitter.com/Maheshbodas" target='new' color="inherit">
              @maheshbodas
            </Link>
        </ListItemIcon>
        <ListItemIcon>
            <MailOutlineIcon fontSize="small" />&nbsp;&nbsp;
            <Link href="mailto:mahesh.bodas@gmail.com" target='new' color="inherit">
              mahesh.bodas@gmail.com
            </Link>
        </ListItemIcon>
      </CardActions>
    </Card>
  );
}
