import React, { Component } from "react";
import authService from "../../services/AuthService";
import { withAuthConsumer } from "../../contexts/AuthStore";

//import { Layout, Avatar, Button } from "antd";
import { Layout, Button } from "antd";
const { Header } = Layout;

//const HeaderApp = () => (
class HeaderApp extends Component {
  handleLogout = () => {
    authService.logout().then(() => {
      this.setState({ logout: true });
      this.props.onUserChange(null);
    });
  };

  render() {
    const { user } = this.props;

    return (
      <Header className="header my-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <h2 style={{ color: "white" }}>Travel Xperience</h2>
        <h3 style={{ color: "blue" }}>Hi, {user.username}!!!</h3>
        {/* <Avatar
          className="avatar"
          src={user.avatarURL}
          shape="square"
          size="large"
        /> */}
        <Button shape="circle" icon="logout" onClick={this.handleLogout} />
      </Header>
    );
  }
}

export default withAuthConsumer(HeaderApp);
