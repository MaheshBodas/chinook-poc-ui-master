import auth from '../api/auth'
export const viewallTracksService = {
    getTracks
};

function getTracks(pageNum, pageSize) {
    return new Promise((resolve, reject) => {
        auth.getTracks(pageNum, pageSize).then(response => {
          const trackinstances = response
          if(trackinstances !== null) {
            resolve(trackinstances)
          }
          else {
            const strError  = 'No data found for Tracks'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getTracks')
          reject(error)
        })
      })
}
