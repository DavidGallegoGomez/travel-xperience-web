import React, { Component } from "react";
import LayoutApp from "../../components/misc/LayoutApp";
import authService from "../../services/AuthService";
import { withAuthConsumer } from "../../contexts/AuthStore";

class Profile extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {},
    touch: {}
  };

  handleChange = event => {
    const { name, value, files } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: files && files[0] ? files[0] : value
      },
      errors: {
        ...this.state.errors
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
      authService.updateProfile(this.state.user).then(
        user => this.setState({ user: { ...this.state.user, ...user } }),
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

  handleLogout = () => {
    authService.logout().then(() => this.props.onUserChange(null));
  };

  componentDidMount() {
    authService
      .getProfile()
      .then(
        user => this.setState({ user: { ...this.state.user, ...user } }),
        error => console.error(error)
      );
  }

  render() {
    const { errors, user, touch } = this.state;

    return (
      <LayoutApp>
        <div className="box mx-auto">
          <div className="row">
            <i
              className="fa fa-sign-out btn-logout"
              onClick={this.handleLogout}
            />
            <div className="col-6">
              <h3>Profile</h3>
              <form
                id="profile-form"
                className="mt-4"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <p>Logged User: {user.username}</p>
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
            </div>
            <div className="col-6 pt-4">
              <button
                className="btn btn-white"
                form="profile-form"
                type="submit"
                disabled={!this.isValid()}
              >
                Update profile
              </button>
              <p className="mt-5">
                <small>
                  This user is able to upload a new profile photo, using NodeJS
                  and Multer uploader.
                </small>
              </p>
            </div>
          </div>
        </div>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Profile);
