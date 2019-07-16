import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import FormField from "./misc/FormField";
import countries from "../data/countries.json";

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
  departureDate: value => {
    let message;
    if (!value) {
      message = "Departure day is required";
    } else if (validations["returnDate"](value) < value) {
      message = "Departure day is greater than Return Date";
      console.log(validations["returnDate"](value));
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
      departureDate: "",
      returnDate: ""
    },
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
          <div className="col-12">
            <h3 style={{ textAlign: "center" }}>Busco dónde ir</h3>
            <form
              id="register-form"
              className="mt-4"
              onSubmit={this.handleSubmit}
            >
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
                  validationClassName={this.getValidationClassName(
                    "originCity"
                  )}
                />
              ) : (
                <FormField
                  label="OriginCity"
                  name="originCity"
                  onBlur={this.handleBlur}
                  value={data.originCity}
                  onChange={this.handleChange}
                  touch={touch.originCity}
                  error={errors.originCity}
                  type="text"
                  validationClassName={this.getValidationClassName(
                    "originCity"
                  )}
                />
              )}

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

              <div className="text-center">
                <button
                  className={`btn ${
                    !this.isValid()
                      ? "btn-outline-danger"
                      : "btn-outline-primary"
                  }`}
                  form="register-form"
                  type="submit"
                  disabled={!this.isValid()}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Busco);
