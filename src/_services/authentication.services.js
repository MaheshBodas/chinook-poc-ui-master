import auth from '../api/auth'
import { setToken, removeToken } from '../utils/auth'
export const authenticationService = {
    login,
    logout,    
    getUserDetails,
    getAll    
};

function login(username, password) {    
    return new Promise((resolve, reject) => {
        removeToken()
        auth.login(username, password).then(response => {
          const data = response
          if(data !== null ) {
            console.log('Login Data')
            console.log(data)
            setToken(data.key)
            localStorage.setItem('user', JSON.stringify(username));
            // commit('SET_TOKEN', data.key)
            // commit('SET_LOGIN_NAME', username)
            resolve(username)
          } else {
              const strError  = 'Login failed for user ' + username
              reject(strError) 
          }
        }).catch(error => {
            console.log('auth.login fail')
            reject(error)
          })
    })
}

function logout() {
    // remove user from local storage to log user out
    removeToken();
    localStorage.removeItem('user');
    return new Promise((resolve, reject) => {        
      auth.logout().then(response => {
        const data = response
        if(data !== null ) {
          console.log('Logout reponse Data')
          console.log(data)
          removeToken()
          resolve()           
        } else {
          const strError  = 'Logout failed for user'
          reject(strError)
        } 
      }).catch(error => {
        console.log('auth.logout fail')
        reject(error)
      })
    })
}

function getUserDetails(userName) {
    return new Promise((resolve, reject) => {
      auth.getAccountDetails(userName).then(response => {
      console.log('auth.getAccountDetails success')
      const userdata = response
      console.log('getAccountDetails response')        
      console.log(userdata)    
      if(userdata && userdata.length >= 1 ) {
        const userDataObj = userdata[0]
        console.log(userDataObj)
        console.log(userDataObj.is_superuser)
        resolve(userdata)
      } else {
          const strError  = 'No user details found for user ' + userName
          reject(strError)
      }
    }).catch(error => {
        console.log('auth.getUsers fail')
        reject(error)
    })
  })
}   

function getAll() {
    return new Promise((resolve, reject) => {
        auth.getUsers().then(response => {
            const data = response
            console.log('Users Data')
            console.log(data)                        
            resolve(data)
          }).catch(error => {
            console.log('auth.getUsers fail')
            reject(error)
          })
    })
}


// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         console.log('server response')
//         console.log(data)
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();                
//                 window.location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//         console.log('Token' + data.key)
//         return data;
//     });
// }