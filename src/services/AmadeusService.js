import http from "./BaseService";

const getCities = query => http.get("/amadeus/cities", {
      params: {
        keyword: query.keyword,
        countryCode: query.countryCode
      }
    })
    .then(res => Promise.resolve(res.data));

const getFlight = query => http.get("/amadeus/flight", {
      params: {
        origin: query.origin,
        destination: query.destination,
        departureDate: query.departureDate,
        returnDate: query.returnDate
      }
    })
    .then(res => Promise.resolve(res.data));

const getHotel = query => http.get("/amadeus/hotel", {
      params: {
        cityCode: query
      }
    })
    .then(res => Promise.resolve(res.data));

const getPOI = query => http.get("/amadeus/poi", {
      params: {
        latitude: query.latitude,
        longitude: query.longitude
      }
    })
    .then(res => Promise.resolve(res.data));

export default {
  getCities,
  getFlight,
  getHotel,
  getPOI
};
