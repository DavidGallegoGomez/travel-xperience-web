import http from "./BaseService";

const getCities = query => http.get("/amadeus/cities", {
      params: {
        keyword: query,
        countryCode: "ES"
      }
    })
    .then(res => Promise.resolve(res.data));

const getFlight = query => http.get("/amadeus/flight", {
      params: {
        keyword: query,
        countryCode: "ES"
      }
    })
    .then(res => Promise.resolve(res.data));

const getCities = query => http.get("/amadeus/cities", {
      params: {
        keyword: query,
        countryCode: "ES"
      }
    })
    .then(res => Promise.resolve(res.data));

const getCities = query => http.get("/amadeus/cities", {
      params: {
        keyword: query,
        countryCode: "ES"
      }
    })
    .then(res => Promise.resolve(res.data));

export default {
  getCities,
  getFlight,
};
