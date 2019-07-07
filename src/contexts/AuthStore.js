import React, { Component } from 'react';

const CURRENT_USER_KEY = 'current-user';
const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: JSON.parse( localStorage.getItem(CURRENT_USER_KEY) || '{}' )
  }

  handleUserChange = (user) => {
    this.setState({ user: user })
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(CURRENT_USER_KEY)
  }

  isAuthenticated = () => {
    return this.state.user && this.state.user.username
  }

  render() {
    return(
      <AuthContext.Provider value= {{
        user: this.state.user,
        onUserChange: this.handleUserChange,
        isAuthenticated: this.isAuthenticated
      }} >
        { this.props.children }
      </AuthContext.Provider>
    );
  }
}

const withAuthConsumer = (WrappedComponent) => {
  return() => (
    <AuthContext.Consumer>
      { (props) => (<WrappedComponent {...props} />) }
    </AuthContext.Consumer>
  )
}

export { AuthStore, AuthContext, withAuthConsumer }
