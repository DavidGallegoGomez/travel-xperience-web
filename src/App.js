import React, { Component } from "react";
import "./App.css";
import Login from './components/auth/Login';

import { Layout, Menu, Icon, Avatar } from "antd";
const { Header, Content, Sider } = Layout;

class App extends Component {
  state = { collapsed: false };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="my-header">
            <div className="logo" />
            <h1 style={{ color: "white" }}>Travel Xperience</h1>
            <Avatar
              className="avatar"
              shape="square"
              size="large"
              icon="user"
            />
          </div>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item style={{ margin: 'auto' }} key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span>User</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="team" />
                <span>Team</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                // minHeight: 280,
                height: "calc(79vh)" // TODO: revisar para que quede al 100% sin su padding (¿funciona 'calc'?)
              }}
            >
              <Login></Login>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
