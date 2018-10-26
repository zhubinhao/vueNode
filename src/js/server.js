import axios from 'axios'
const URL = 'http://45.32.100.27:3000/'
/**
 *  get
 * @param {*} url 
 * @param {*} data  
 * @param {*} call 
 */
export const GET = (url, data, call) => { 
  axios.get(`${URL}${url}`, {
    params: data
  }).then(res => {
      if(res.data.flog===0){
          alert(res.data.msg)
          return;
      }
    return call(res.data)

  }).catch(err => {
    console.log(err)
  })
}
/**
 * post
 * @param {*} url 
 * @param {*} data 
 * @param {*} call 
 */
export const POST = (url, data, call) => {
  axios.post(`${URL}${url}`, data).then(res => {
    return call(res.data)
  }).catch(err => {
    console.log(err)
  })
}



export default {
  GET,
  URL,
  POST
}
