import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
// import { store } from './_helpers';
import {useSelector} from 'react-redux'

const App = () => {
  const {loggedIn} = useSelector((state) => state.authentication);
  const routing = useRoutes(routes(loggedIn));
  // const routing = useRoutes(routes);
  console.log('App loggedIn=' + loggedIn);
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          {routing}
      </ThemeProvider>
  );
};

const AppWrapper = () => {
  return (
      <App />    
  );
};

export default AppWrapper
// export default App;
