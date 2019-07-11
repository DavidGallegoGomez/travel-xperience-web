import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/AuthService";
import { withAuthConsumer } from "../../contexts/AuthStore";

const validations = {
  username: value => {
    let message;
    if (!value) {
      message = "UserName is required";
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

class Login extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    errors: {},
    touch: {},
    isAuthenticated: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
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

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user).then(
        user => {
          this.setState({ isAuthenticated: true }, () => {
            this.props.onUserChange(user);
          });
        },
        error => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              password: !errors && message
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
    const { isAuthenticated, errors, user, touch } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <h3>Log in</h3>
            <form id="login-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>username</label>
                <input
                  type="username"
                  name="username"
                  className={`form-control ${
                    touch.username && errors.username ? "is-invalid" : ""
                  }`}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.username}
                />
                <div className="invalid-feedback">{errors.username}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    touch.password && errors.password ? "is-invalid" : ""
                  }`}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.password}
                />
                <div className="invalid-feedback">{errors.password}</div>
              </div>
            </form>
            <p className="mt-4">
              <small>
                If you don't have an account yet, you can create your account{" "}
                <Link to="/register">here</Link>
              </small>
            </p>
            <button
              className="btn btn-white"
              form="login-form"
              type="submit"
              disabled={!this.isValid()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuthConsumer(Login);
