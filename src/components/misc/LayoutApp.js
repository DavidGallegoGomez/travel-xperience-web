import React, { Component } from "react";
import HeaderApp from './HeaderApp';

import { Layout, Menu, Icon } from "antd";
const { Content, Sider } = Layout;

class LayoutApp extends Component {
  state = { collapsed: true };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      // TODO: Meter esto en un componente Header
      <Layout>
        
        <HeaderApp />

        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item style={{ margin: "auto" }} key="1">
                <Icon type="pie-chart" />
                <span>Busco dónde ir</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Reservo mi viaje</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span>Preparo mi viaje</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="team" />
                <span>Disfruto en mi destino</span>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="file" />
                <span>Mis recuerdos</span>
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
              
              {/* TODO: children props HERE!!! */}

            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutApp;
