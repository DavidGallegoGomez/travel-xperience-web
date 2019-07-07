import React, { Component } from 'react';
// import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';

class Register extends Component {
  render() {
    return (
      <p>REGISTER COMPONENT</p>
    );
  }
}

export default withAuthConsumer(Register)