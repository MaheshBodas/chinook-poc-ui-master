// import session from './session'
import session from '../utils/request'

//export default {
const auth  = {
  login(username, password) {
    console.log('REACT_APP_BASE_API:' + process.env.REACT_APP_BASE_API)
    console.log('Username:' + username)
    // console.log('Password:' + password)
    return session.post('/auth/login/', { username, password })
  },
  retrievetoken(username, password) {
    return session.post('/api-token-auth/', { username, password })
  },
  logout() {
    return session.post('/auth/logout/', {})
  },
  createAccount(username, password1, password2, email) {
    return session.post('/registration/', { username, password1, password2, email })
  },
  changeAccountPassword(password1, password2) {
    return session.post('/auth/password/change/', { password1, password2 })
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/auth/password/reset/', { email })
  },
  resetAccountPassword(uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 })
  },
  getCurrentUser() {
    return session.get('/auth/user/')
  },
  getUsers() {
    return session.get('/users/')
  },
  getAccountDetails(username) {
    return session.get('/users/?username=' + username)
  },
  updateAccountDetails(data) {
    return session.patch('/auth/user/', data)
  },
  verifyAccountEmail(key) {
    return session.post('/registration/verify-email/', { key })
  },
  getTracks(pageNum, pageSize) {
    let strQueryParam = '?page=' + pageNum + '&page_size=' + pageSize;
    // let strQueryParam = '?page_size=25';
    // return session.get('/tracks/?page=' + pageNum)
    console.log(strQueryParam);
    return session.get('/tracks/' + strQueryParam)
    //return session.get('/tracks/?')
  }
  // Risk API related functions
}

export default auth;
