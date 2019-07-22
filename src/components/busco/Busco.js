import React, { Component } from "react";
import LayoutApp from "../misc/LayoutApp";
import { withAuthConsumer } from "../../contexts/AuthStore";
import FormField from "../misc/FormField";
import countries from "../../data/countries.json";
import amadeusService from '../../services/AmadeusService';
import BuscoDate from '../busco/misc/BuscoDate';
import SearchCitiesOrigin from '../SearchCities2';

const validations = {
  originCountry: value => {
    let message;
    if (!value) {
      message = "Origin country is required";
    }
    return message;
  },
  originCity: value => {
    let message;
    if (!value) {
      message = "Origin city is required";
    }
    return message;
  },
  destinationCountry: value => {
    let message;
    if (!value) {
      message = "Destination country is required";
    }
    return message;
  },
  destinationCity: value => {
    let message;
    if (!value) {
      message = "Destination city is required";
    }
    return message;
  },
  
  originCityDrop: value => {
    let message;
    if (!value) {
      message = "Origin city is required";
    }
    return message;
  },
  destinationCityDrop: value => {
    let message;
    if (!value) {
      message = "Destination city is required";
    }
    return message;
  },

  departureDate: value => {
    let message;
    if (!value) {
      message = "Departure day is required";
    }
    return message;
  },
  returnDate: value => {
    let message;
    if (!value) {
      message = "Return day is required";
    }
    return message;
  }
};

class Busco extends Component {
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

  handleInputChangeOrigin = (event) => {
    // const { name, value } = event.target; //DIEGO!!!
    // if (name === 'originCity')
    this.setState({ queryOrigin: this.search.value },
      () => {
        // if (this.state.query.keyword && this.state.query.keyword.length > 2) {
        if (this.state.queryOrigin && this.state.queryOrigin.length > 2) {
          this.getInfoOrigin();
        }
      }
    );
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
  
  handleInputChangeDest = (event) => {
    this.setState({ queryDestination: this.search.value },
      () => {
        // if (this.state.query.keyword && this.state.query.keyword.length > 2) {
        if (this.state.queryDestination && this.state.queryDestination.length > 2) {
          this.getInfoDest();
        }
      }
    );
  };

  /////////
  handleChange = event => {
    const { name, value } = event.target;
    const isValid = validations[name] && validations[name](value);
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: isValid
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
        <h3 style={{ textAlign: "center" }}>Busco dónde ir</h3>
        <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
          
          <SearchCitiesOrigin onChange={this.handleChange}/>

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
                <div className="invalid-feedback">{errors.destinationCityDrop}</div>
              </div>
            </div>
          </div>

          <BuscoDate onChange={this.handleChange}/>

          <div className="text-center" style={{ paddingTop: "15px" }}>
            <button
              className={`btn ${
                !this.isValid() ? "btn-outline-danger" : "btn-outline-primary"
              }`}
              form="register-form"
              type="submit"
              disabled={!this.isValid()}
            >
              Search
            </button>
          </div>
        </form>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Busco);
