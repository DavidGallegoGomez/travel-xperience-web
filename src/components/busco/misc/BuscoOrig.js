import React, { Component } from "react";
import FormField from "../misc/FormField";
import countries from "../../data/countries.json";
import amadeusService from "../../services/AmadeusService";

class BuscoOrig extends Component {
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

  getInfoOrigin = () => {
    // amadeusService.getCities(this.state.query.keyword).then(
    amadeusService.getCities(this.state.queryOrigin).then(
      data => {
        console.log(data);
        this.setState({ resultsOrigin: data });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleInputChangeOrigin = event => {
    // const { name, value } = event.target; //DIEGO!!!
    // if (name === 'originCity')
    this.setState({ queryOrigin: this.search.value }, () => {
      // if (this.state.query.keyword && this.state.query.keyword.length > 2) {
      if (this.state.queryOrigin && this.state.queryOrigin.length > 2) {
        this.getInfoOrigin();
      }
    });
  };

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

  /////////
  
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
      <LayoutApp>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>OriginCountry</label>
              <select
                className={`form-control ${
                  touch.originCountry && errors.originCountry
                    ? "is-invalid"
                    : ""
                }`}
                name="originCountry"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.originCountry}
              >
                {countriesOpts}
              </select>
              <div className="invalid-feedback">{errors.originCountry}</div>
            </div>
          </div>
          <div className="col">
            {errors.originCountry ? (
              <FormField
                disabled
                label="OriginCity"
                name="originCity"
                onBlur={this.handleBlur}
                value={data.originCity}
                onChange={this.handleChange}
                touch={touch.originCity}
                error={errors.originCity}
                type="text"
                validationClassName={this.getValidationClassName("originCity")}
              />
            ) : (
              <FormField
                label="OriginCity"
                name="originCity"
                onBlur={this.handleBlur}
                value={data.originCity}
                // onChange={this.handleChange}

                // ref={input => (this.search = input)}
                onChange={this.handleInputChangeOrigin}
                touch={touch.originCity}
                error={errors.originCity}
                type="text"
                validationClassName={this.getValidationClassName("originCity")}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>OriginCityDrop</label>
              <select
                className={`form-control ${
                  touch.originCityDrop && errors.originCityDrop
                    ? "is-invalid"
                    : ""
                }`}
                name="originCityDrop"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={data.originCityDrop}
              >
                {countriesOpts}
              </select>
              <div className="invalid-feedback">{errors.originCityDrop}</div>
            </div>
          </div>
        </div>
      </LayoutApp>
    );
  }
}

export default BuscoOrig;
