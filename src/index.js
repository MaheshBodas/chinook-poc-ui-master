import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'src/themes/redmond/jquery-ui.min.css'// import './themes/html5up/assets/css/main.css'
import 'element-theme-default/lib/index.css'
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import AppWrapper from './App';
//Add State
import { Provider } from 'react-redux'
import { store } from './_helpers';

i18n.use(locale);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
