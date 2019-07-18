import React, { Component } from "react";
import FormField from "../../misc/FormField";

class BuscoDate extends Component {
  state = {
    data: {
      departureDate: "",
      returnDate: ""
    },
    errors: {
      departureDate: true,
      returnDate: true
    },
    touch: {}
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

    return (
      <div className="row">
        <div className="col">
          <FormField
            label="Salida"
            name="departureDate"
            onBlur={this.handleBlur}
            value={data.departureDate}
            onChange={this.props.onChange}
            touch={touch.departureDate}
            error={errors.departureDate}
            type="date"
            validationClassName={this.getValidationClassName("departureDate")}
          />
        </div>
        <div className="col">
          <FormField
            label="Llegada"
            name="returnDate"
            onBlur={this.handleBlur}
            value={data.returnDate}
            onChange={this.props.onChange}
            touch={touch.returnDate}
            error={errors.returnDate}
            type="date"
            validationClassName={this.getValidationClassName("returnDate")}
          />
        </div>
      </div>
    );
  }
}

export default BuscoDate;
