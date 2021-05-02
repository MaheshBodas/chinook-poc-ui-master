import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { viewalltracks} from './viewalltracks.reducer';
// import { spliceriskfields} from './spliceriskfields.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,  
  viewalltracks,
  // spliceriskfields
});

export default rootReducer;