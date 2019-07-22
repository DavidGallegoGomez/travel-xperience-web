import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import FormField from "./misc/FormField";
import countries from "../data/countries.json";
import amadeusService from "../services/AmadeusService";
import { Redirect } from "react-router-dom";

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

class BuscoNew extends Component {
  state = {
    data: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
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
      departureDate: true,
      returnDate: true
    },
    touch: {}
  };
  
  getInfoOrigin = () => {
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
    this.setState(
      {
        queryOrigin: {
          ...this.state.queryOrigin,
          keyword: this.searchOri.value
        }
      },
      () => {
        if (
          this.state.queryOrigin.keyword &&
          this.state.queryOrigin.keyword.length > 2
        ) {
          this.getInfoOrigin();
        }
      }
    );
  };

  handleChangeCountryOrigin = event => {
    const { name, value } = event.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      queryOrigin: {
        ...this.state.queryOrigin,
        countryCode: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    });
  };
  
  getInfoDest = () => {
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
    this.setState(
      {
        queryDestination: {
          ...this.state.queryDestination,
          keyword: this.searchDest.value
        }
      },
      () => {
        if (
          this.state.queryDestination.keyword &&
          this.state.queryDestination.keyword.length > 2
        ) {
          this.getInfoDest();
        }
      }
    );
  };

  handleChangeCountryDest = event => {
    const { name, value } = event.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      queryDestination: {
        ...this.state.queryDestination,
        countryCode: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    });
  };

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
      console.log(this.props);
      // TODO
      // this.props.onSearchTravel(this.state.data);
      // render() { (<Redirect to="/reservo" />) }
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

    const citiesOptsOrigin = this.state.resultsOrigin.map(c => (
      <option key={c.iataCode} value={c.address.cityCode}>
        {c.name}
      </option>
    ));
    
    const citiesOptsDest = this.state.resultsDestination.map(c => (
      <option key={c.iataCode} value={c.address.cityCode}>
        {c.name}
      </option>
    ));

    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center" }}>Busco dónde ir {this.props.titulo}</h3>
        <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Salida (País)</label>
                <select
                  className={`form-control ${
                    touch.originCountry && errors.originCountry
                      ? "is-invalid"
                      : ""
                  }`}
                  name="originCountry"
                  onChange={this.handleChangeCountryOrigin}
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
                  name="buscoSalida"
                  className="form-control"
                  label="Busco aeropuerto"
                  placeholder="Busco aeropuerto..."
                  ref={input => (this.searchOri = input)}
                  onChange={this.handleInputChangeOrigin}
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
                  onChange={this.handleChangeCountryOrigin}
                  onBlur={this.handleBlur}
                  value={data.originCity}
                >
                  {citiesOptsOrigin}
                </select>
                <div className="invalid-feedback">{errors.originCity}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Llegada (País)</label>
                <select
                  className={`form-control ${
                    touch.destinationCountry && errors.destinationCountry
                      ? "is-invalid"
                      : ""
                  }`}
                  name="destinationCountry"
                  onChange={this.handleChangeCountryDest}
                  onBlur={this.handleBlur}
                  value={data.destinationCountry}
                >
                  {countriesOpts}
                </select>
                <div className="invalid-feedback">{errors.destinationCountry}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col">
                <label>Busco aeropuerto</label>
                <input
                  name="buscoLlegada"
                  className="form-control"
                  label="Busco aeropuerto"
                  placeholder="Busco aeropuerto..."
                  ref={input => (this.searchDest = input)}
                  onChange={this.handleInputChangeDest}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>Llegada (Ciudad)</label>
                <select
                  className={`form-control ${
                    touch.destinationCity && errors.destinationCity ? "is-invalid" : ""
                  }`}
                  name="destinationCity"
                  onChange={this.handleChangeCountryDest}
                  onBlur={this.handleBlur}
                  value={data.destinationCity}
                >
                  {citiesOptsDest}
                </select>
                <div className="invalid-feedback">{errors.destinationCity}</div>
              </div>
            </div>
          </div>

          

          <div className="row">
            <div className="col">
              <FormField
                label="DepartureDate"
                name="departureDate"
                onBlur={this.handleBlur}
                value={data.departureDate}
                onChange={this.handleChange}
                touch={touch.departureDate}
                error={errors.departureDate}
                type="date"
                validationClassName={this.getValidationClassName(
                  "departureDate"
                )}
              />
            </div>
            <div className="col">
              <FormField
                label="ReturnDate"
                name="returnDate"
                onBlur={this.handleBlur}
                value={data.returnDate}
                onChange={this.handleChange}
                touch={touch.returnDate}
                error={errors.returnDate}
                type="date"
                validationClassName={this.getValidationClassName("returnDate")}
              />
            </div>
          </div>

          <div className="text-center" style={{ paddingTop: "15px" }}>
            <button
              className={`btn ${
                !this.isValid() ? "btn-outline-danger" : "btn-outline-primary"
              }`}
              form="register-form"
              type="submit"
              disabled={!this.isValid()}
              onClick={ () => <Redirect to="/reservo" /> } 
            >
              Search
            </button>
          </div>
        </form>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(BuscoNew);
