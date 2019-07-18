import React, { Component } from "react";
import countries from "../data/countries.json";
import amadeusService from "../services/AmadeusService";

class SearchCities extends Component {
  state = {
    query: {
      keyword: "",
      countryCode: ""
    },
    results: [],
    data: {
      originCountry: "",
      originCity: ""
    },
    touch: {}
  };

  getInfo = () => {
    // componentDidMount()
    amadeusService.getCities(this.state.query).then(
      data => {
        this.setState({ results: data });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleInputChange = () => {
    this.setState(
      {
        query: {
          ...this.state.query,
          keyword: this.search.value
        }
      },
      () => {
        if (this.state.query.keyword && this.state.query.keyword.length > 2) {
          this.getInfo();
          console.log(this.state.results);
        }
      }
    );
  };

  handleChangeCountry = event => {
    const { value } = event.target;
    this.setState({
      query: {
        ...this.state.query,
        countryCode: value
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      query: {
        ...this.state.query,
        countryCode: value
      }
    });
  };

  handleBlur = event => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    });
  };

  render() {
    const { data } = this.state;

    const countriesOpts = countries.map(c => (
      <option key={c.code} value={c.code.toUpperCase()}>
        {c.name}
      </option>
    ));

    const citiesOpts = this.state.results.map(c => (
      <option key={c.iataCode} value={c.name}>
        {c.name}
      </option>
    ));

    return (
      <form className="mt-4">
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label>OriginCountry</label>
              <select
                className="form-control"
                name="originCountry"
                onChange={this.handleChangeCountry}
                onBlur={this.handleBlur}
                value={data.originCountry}
              >
                {countriesOpts}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col">
              <input
                placeholder="Search airport..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="col-4">
            <div className="form-group">
              <label>OriginCity</label>
              <select
                name="originCity"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.originCity}
              >
                {citiesOpts}
              </select>
            </div>
          </div>
        </div>

        <p>{this.state.query.keyword}</p>
        <p>{this.state.query.countryCode}</p>
        <p>------------------------------</p>
        <p>{this.state.data.originCountry}</p>
        <p>{this.state.data.originCity}</p>
      </form>
    );
  }
}

export default SearchCities;
