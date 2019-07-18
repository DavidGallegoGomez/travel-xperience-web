import React, { Component } from "react";
import FormField from "../misc/FormField";
import countries from "../../data/countries.json";
import amadeusService from "../../services/AmadeusService";

class BuscoDest extends Component {
  state = {
    data: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",

      originCityDrop: "",
      destinationCityDrop: "",

      departureDate: "",
      returnDate: ""
    },
    queryOrigin: {
      keyword: "",
      countryCode: ""
    },
    queryDestination: {
      keyword: "",
      countryCode: ""
    },

    resultsOrigin: [],
    resultsDestination: [],

    errors: {
      originCountry: true,
      originCity: true,
      destinationCountry: true,
      destinationCity: true,

      originCityDrop: true,
      destinationCityDrop: true,

      departureDate: true,
      returnDate: true
    },
    touch: {}
  };

  /////////

  getInfoDest = () => {
    // amadeusService.getCities(this.state.query.keyword).then(
    amadeusService.getCities(this.state.queryDestination).then(
      data => {
        console.log(data);
        this.setState({ resultsDestination: data });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleInputChangeDest = event => {
    this.setState({ queryDestination: this.search.value }, () => {
      // if (this.state.query.keyword && this.state.query.keyword.length > 2) {
      if (
        this.state.queryDestination &&
        this.state.queryDestination.length > 2
      ) {
        this.getInfoDest();
      }
    });
  };

  ////////

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

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      console.log(this.state.data);
      this.props.onSearch(this.state.data);
    }
  };

  isValid = () => {
    return !Object.keys(this.state.data).some(attr => this.state.errors[attr]);
  };

  render() {
    const { errors, data, touch } = this.state;

    const countriesOpts = countries.map(c => (
      <option key={c.code} value={c.code.toUpperCase()}>
        {c.name}
      </option>
    ));

    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>DestinationCountry</label>
              <select
                className={`form-control ${
                  touch.destinationCountry && errors.destinationCountry
                    ? "is-invalid"
                    : ""
                }`}
                name="destinationCountry"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.destinationCountry}
              >
                {countriesOpts}
              </select>
              <div className="invalid-feedback">
                {errors.destinationCountry}
              </div>
            </div>
          </div>
          <div className="col">
            {errors.destinationCountry ? (
              <FormField
                disabled
                label="DestinationCity"
                name="destinationCity"
                onBlur={this.handleBlur}
                value={data.destinationCity}
                onChange={this.handleChange}
                touch={touch.destinationCity}
                error={errors.destinationCity}
                type="text"
                validationClassName={this.getValidationClassName(
                  "destinationCity"
                )}
              />
            ) : (
              <FormField
                label="DestinationCity"
                name="destinationCity"
                onBlur={this.handleBlur}
                value={data.destinationCity}
                onChange={this.handleChange}
                touch={touch.destinationCity}
                error={errors.destinationCity}
                type="text"
                validationClassName={this.getValidationClassName(
                  "destinationCity"
                )}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>DestinationCityDrop</label>
              <select
                className={`form-control ${
                  touch.destinationCityDrop && errors.destinationCityDrop
                    ? "is-invalid"
                    : ""
                }`}
                name="destinationCityDrop"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.destinationCityDrop}
              >
                {countriesOpts}
              </select>
              <div className="invalid-feedback">
                {errors.destinationCityDrop}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuscoDest;
