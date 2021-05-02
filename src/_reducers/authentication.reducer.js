import { authenticationConstants } from '../_constants';
// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {loggedIn: false, user:'', beginRedirect: false, error: ''};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        ...state,
        beginRedirect: true,
        loggedIn: false,
        user: action.user,
        error: ''
      };
    case authenticationConstants.LOGIN_SUCCESS:
      console.log('authenticationConstants.LOGIN_SUCCESS:')
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {
        beginRedirect: false,
        error: action.error
      };
    case authenticationConstants.REDIRECT_REQUEST:
    console.log('authenticationConstants.REDIRECT_REQUEST:' + action.user)
      return {
        ...state,
        beginRedirect: true,
        user: action.userName
      };
    case authenticationConstants.REDIRECT_SUCCESS:
      console.log('authenticationConstants.REDIRECT_SUCCESS:')
      return {
        ...state,
        beginRedirect: false,
        user: action.user
      };
    case authenticationConstants.REDIRECT_CANCELLED:
      return {
        ...state,
        beginRedirect: false,
        user: action.user
      };
    case authenticationConstants.LOGOUT:
      return {        
      };
    case authenticationConstants.GET_USER_DETAIL_REQUEST:
      return {
        loading: true,
        loggedIn: true,
        user: action.userName
      };
    case authenticationConstants.GET_USER_DETAIL_REQUEST_SUCCESS:
      const userDetail = action.userDetail
      let userRoles,avatar
      if (userDetail.is_superuser === true) {
        userRoles = 'admin'
        avatar = '/static/images/avatars/admin_office.gif'
      } else {
        userRoles = 'editor'
        avatar = '/static/images/avatars/editor.gif'
      }
      return {
        loading: false,
        loggedIn: true,
        userRoles: userRoles,
        isAdmin: userDetail.is_superuser,
        user: userDetail.username,
        avatar: avatar
      };
    case authenticationConstants.GET_USER_DETAIL_REQUEST_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
