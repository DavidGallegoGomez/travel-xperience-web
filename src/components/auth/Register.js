import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/AuthService";
import { withAuthConsumer } from "../../contexts/AuthStore";
import FormField from "../misc/FormField";

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  username: value => {
    let message;
    if (!value) {
      message = "Username is required";
    }
    return message;
  },
  email: value => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid email pattern";
    }
    return message;
  },
  password: value => {
    let message;
    if (!value) {
      message = "Password is required";
    }
    return message;
  }
};

class Register extends Component {
  state = {
    user: {
      username: "",
      email: "",
      password: ""
    },
    errors: {
      username: true,
      email: true,
      password: true
    },
    touch: {},
    isRegistered: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    const isValid = validations[name] && validations[name](value);
    this.setState({
      user: {
        ...this.state.user,
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
      authService.register(this.state.user).then(
        user => this.setState({ isRegistered: true }),
        error => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              email: !errors && message
            }
          });
        }
      );
    }
  };

  isValid = () => {
    return !Object.keys(this.state.user).some(attr => this.state.errors[attr]);
  };

  render() {
    const { isRegistered, errors, user, touch } = this.state;

    if (isRegistered) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-12">
            <h3>Sign up</h3>
            <form
              id="register-form"
              className="mt-4"
              onSubmit={this.handleSubmit}
            >
              <FormField
                label="Username"
                name="username"
                onBlur={this.handleBlur}
                value={user.username}
                onChange={this.handleChange}
                touch={touch.username}
                error={errors.username}
                type="text"
                validationClassName={this.getValidationClassName("username")}
              />

              <FormField
                label="Email"
                name="email"
                onBlur={this.handleBlur}
                value={user.email}
                onChange={this.handleChange}
                touch={touch.email}
                error={errors.email}
                type="text"
                validationClassName={this.getValidationClassName("email")}
              />

              <FormField
                label="Password"
                name="password"
                onBlur={this.handleBlur}
                value={user.password}
                onChange={this.handleChange}
                touch={touch.password}
                error={errors.password}
                type="password"
                validationClassName={this.getValidationClassName("password")}
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
                  Create the Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Register);
