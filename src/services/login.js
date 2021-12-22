import axios from 'axios'
const baseUrl = '/api/login'

const getToken = (data) => {
  return axios.post(baseUrl, data)
    .then(res => res.data)
}

export default { getToken }
