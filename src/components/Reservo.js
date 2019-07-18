import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import { Card } from "antd";

class Reservo extends Component {
  render() {
    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center" }}>Mi vuelo</h3>

        <div style={{padding: '20px', display: 'flex', justifyContent: 'center'}} >
          <Card title="Default size card" style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>

      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Reservo);
