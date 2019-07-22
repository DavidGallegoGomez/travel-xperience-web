import React, { Component } from "react";
import countries from "../data/countries.json";
import amadeusService from "../services/AmadeusService";

class SearchCitiesOrigin extends Component {
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
    errors: {
      originCountry: true,
      originCity: true
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
          // this.props.onChange();
        }
      }
    );
  };

  handleChangeCountry = event => {
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
    // this.props.onChange(this.state.originCountry);
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
    // this.props.onChange(this.state.originCity);
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

  getValidationClassName = attr => {
    const { errors, touch } = this.state;

    if (!touch[attr]) {
      return "";
    } else if (errors[attr]) {
      return "is-invalid";
    } else {
      return "is-valid";
    }
  };

  render() {
    const { errors, touch, data } = this.state;

    const countriesOpts = countries.map(c => (
      <option key={c.code} value={c.code.toUpperCase()}>
        {c.name}
      </option>
    ));

    const citiesOpts = this.state.results.map(c => (
      <option key={c.iataCode} value={c.address.cityCode}>
        {c.name}
      </option>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label>Salida (País)</label>
              <select
                className={`form-control ${
                  touch.originCountry && errors.originCountry
                    ? "is-invalid"
                    : ""
                }`}
                name="originCountry"
                onChange={this.handleChangeCountry}
                onBlur={this.handleBlur}
                value={data.originCountry}
              >
                {countriesOpts}
              </select>
              <div className="invalid-feedback">{errors.originCountry}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col">
              <label>Busco aeropuerto</label>
              <input
                className="form-control"
                label="Busco aeropuerto"
                placeholder="Busco aeropuerto..."
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="col-4">
            <div className="form-group">
              <label>Salida (Ciudad)</label>
              <select
                className={`form-control ${
                  touch.originCity && errors.originCity ? "is-invalid" : ""
                }`}
                name="originCity"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.originCity}
              >
                {citiesOpts}
              </select>
              <div className="invalid-feedback">{errors.originCity}</div>
            </div>
          </div>
        </div>
      </div>

      // <p>{this.state.query.keyword}</p>
      // <p>{this.state.query.countryCode}</p>
      // <p>------------------------------</p>
      // <p>{this.state.data.originCountry}</p>
      // <p>{this.state.data.originCity}</p>
    );
  }
}

export default SearchCitiesOrigin;
