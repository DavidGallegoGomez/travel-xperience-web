import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/AuthService";
import { withAuthConsumer } from "../../contexts/AuthStore";
import FormField from "../misc/FormField";

const validations = {
  username: value => value.length > 0,
  password: value => value.length > 0
};

class Login extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    errors: {
      username: true,
      password: true
    },
    touch: {},
    isAuthenticated: false,
    wrongCredentials: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    const isValid = validations[name](value);
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !isValid
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
    authService.authenticate(this.state.user).then(
      user => {
        this.setState({ isAuthenticated: true }, () => {
          this.props.onUserChange(user);
        });
      },
      error => {
        this.setState({
          wrongCredentials: true,
          errors: {
            ...this.state.errors,
            username: true,
            password: true
          }
        });
      }
    );
  };

  render() {
    const { isAuthenticated, errors, user, touch } = this.state;

    const hasErrors = Object.values(errors).some(el => el === true);

    if (isAuthenticated) {
      // return <Redirect to="/profile" />;
      return <Redirect to="/road" />;
    }

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-12">
            <h3>Login</h3>
            <form id="login-form" className="mt-4" onSubmit={this.handleSubmit}>
              
              {this.state.wrongCredentials && (
                <div className="alert alert-danger" role="alert" style={{ textAlign: 'center' }}>
                  Wrong Credentials!
                </div>
              )}

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

              <p className="mt-4">
                <small>
                  If you don't have an account yet, you can click{" "}
                  <Link to="/register">here</Link>
                </small>
              </p>
              <div className="text-center">
                <button
                  className={`btn ${
                    hasErrors ? "btn-outline-danger" : "btn-outline-primary"
                  }`}
                  disabled={hasErrors}
                  form="login-form"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuthConsumer(Login);
