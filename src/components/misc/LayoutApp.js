import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import { Layout, Menu, Icon } from "antd";

const { Content, Sider } = Layout;

class LayoutApp extends Component {
  state = { collapsed: false, marginLeftContent: "200px" };

  onCollapse = collapsed => {
    console.log(collapsed);
    if (!collapsed) this.setState({ marginLeftContent: "200px" }); else this.setState({ marginLeftContent: "80px" })
    console.log(this.state.marginLeftContent);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderApp />
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              overflow: "auto", height: "100vh",
              position: "fixed", left: 0, top: 75
            }}
          >
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item style={{ margin: "auto" }} key="1">
                <Icon type="pie-chart" />
                <span>Busco dónde ir</span>
                <Link to="/busco"></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Reservo mi viaje</span>
                <Link to="/reservo"></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span>Preparo mi viaje</span>
                <Link to="/preparo"></Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="team" />
                <span>Disfruto en destino</span>
                <Link to="/disfruto"></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="file" />
                <span>Mis recuerdos</span>
                <Link to="/recuerdo"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{ background: "#fff", padding: "24px", marginTop: "75px", marginLeft: `${ this.state.marginLeftContent }` }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutApp;
