import React, { Component } from "react";
import authService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore';

import { Layout, Avatar, Button } from "antd";
const { Header } = Layout;

//const HeaderApp = () => (
class HeaderApp extends Component {
  state = {
    user: {
      username: '',
      avatarURL: ''
    }
  }
  
  handleLogout = () => {
    authService.logout()
      .then(() => this.props.onUserChange(null))
  }
  
  componentDidMount() {
    authService.getProfile()
      .then(
          (user) => {
            this.setState({ user: {...this.state.user, ...user} });
            console.log(user);
          },
          (error) => console.error(error)
        )
  }

  render() {
    const { user } =  this.state;
    
    return (
      <Header className="header">
        <div className="my-header">
          <div className="logo" />
          <h1 style={{ color: "white" }}>Travel Xperience</h1>
          <h2 style={{ color: 'blue' }}>Hi, {user.username}!!!</h2>
          <Avatar className="avatar" src={user.avatarURL} shape="square" size="large" />
          <Button shape="circle" icon="logout" onClick={this.handleLogout} />
        </div>
      </Header>
    );
  }
}

export default withAuthConsumer(HeaderApp);
