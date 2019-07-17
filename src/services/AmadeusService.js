import http from './BaseService'

const getCities = () => http.get('/amadeus/cities', {
  params: {
    keyword: 'mal',
    countryCode: 'ES'
  }
})
  .then( res => Promise.resolve(res.data) );

export default {
  getCities
}
