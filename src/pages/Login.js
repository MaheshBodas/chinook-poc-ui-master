import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import { authenticationActions } from 'src/_actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
  loader: {
    height: 140,
    width: 200,
  },
  loginbutton: {
    width: 400,
  },
}));

async function doWork(dispatch, navigate, values) {
  try {
    const [data1, data2] = await Promise.all([
      dispatch(authenticationActions.login(values.username, values.password)),
      // sleep(3000),
    ]);
    console.log(data1, data2);
  } catch (err) {
    console.log(err);
  }
}

const deriveErrorMessage = (alert_type, message) => {
  let parsedErrorMessage = ''
    console.log('alertType ' + alert_type)
    console.log('message ' + message)
    if(alert_type === 'alert-danger') {
        if(message != null) {
          console.log(message)
          var n = message.search("Cannot read property 'data' of undefined");
          if(n > -1){
            parsedErrorMessage = "Unable to reach to GraphQL based server please try after 5 minutes"
            return parsedErrorMessage;
          }
          try {
            const errorObj = JSON.parse(message)
            console.log(errorObj);
            if(errorObj)  {
              parsedErrorMessage = errorObj['non_field_errors'][0]
            }
          }
          catch(err){
            parsedErrorMessage = message
          }
        }
        else {
          parsedErrorMessage = "Some unexpected error"
        }
    }
    return parsedErrorMessage;
}

const Login = () => {
  const timerRef = React.useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const classes = useStyles();
  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );
  const {beginRedirect} = useSelector((state) => state.authentication);
  const {type: alert_type, message} = useSelector((state) => state.alert);
  let parsedErrorMessage = deriveErrorMessage(alert_type, message)
  return (
    <>
      <Helmet>
        <title>Login | Chinook PoC UI</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("User Name is required"),
              // username: Yup.string().username('Must be a valid username').max(255).required('username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              // await sleep(500);
              try {
                const [data1, data2] = await Promise.all([
                  doWork(dispatch, navigate, values),
                ]);
                console.log(data1, data2);
                await navigate('/app/dashboard', { replace: true });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 5 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Log in
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Sign in on the Chinook API Server.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    Log in now
                  </Button>
                </Box>
                <Box
                  sx={{ py: 2 }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="h4"
                  >
                    username: admin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    password: poctest#1
                  </Typography>

                </Box>
                <Box sx={{ py: 2 }}>
                  { alert_type === 'alert-danger' &&
                      <Alert color="error">
                        { parsedErrorMessage }
                      </Alert>
                  }
                </Box>
                <Box sx={{ py: 2 }}>
                  <div className={classes.root}>
                    {
                      // isSubmitting && <CircularProgress />
                      beginRedirect && <CircularProgress />
                    }
                  </div>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );

}

export default Login;
