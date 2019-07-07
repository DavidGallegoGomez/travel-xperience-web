import React, { Component } from 'react';
// import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';

class Profile extends Component {
  render() {
    return (
      <p>PROFILE COMPONENT</p>
    );
  }
}

export default withAuthConsumer(Profile)