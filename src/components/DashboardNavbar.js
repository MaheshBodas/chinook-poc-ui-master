import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import {useSelector, useDispatch} from 'react-redux'
import { authenticationActions } from 'src/_actions';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  poproot: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
      marginRight: theme.spacing(2),
    },
  table: {
    minWidth: 150,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

async function doWork(dispatch) {
  try {
    const [data1] = await Promise.all([
      dispatch(authenticationActions.logout())
    ]);
    console.log(data1);
  } catch (err) {
    console.log(err);
  }
}

export default function MenuAppBar() {
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const anchorRef = React.useRef(null);

  const {avatar, user} = useSelector((state) => state.authentication);
  console.log('user is' + user);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const [data1] = await Promise.all([
        doWork(dispatch, navigate),
      ]);
      console.log(data1);
      // await navigate('/login', { replace: true });
      // setAnchorEl(null);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        </Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            ref={anchorRef}
          >
            <Avatar alt="Click to Logout" src={avatar} />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                  <Typography variant="h6" className={classes.title}>
                                    Hello {user}
                                  </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={handleLogout}
                                >
                                  Log Out
                                </Button>
                              </TableCell>
                            </TableRow>
                            { loading && <TableRow>
                                <TableCell align="center">
                                {
                                  // isSubmitting && <CircularProgress />
                                   <CircularProgress />
                                }
                                </TableCell>
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </IconButton>
      </Toolbar>
    </AppBar>
  );
}
