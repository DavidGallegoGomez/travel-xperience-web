import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Recuerdo extends Component {
  render() {
    return(
      <LayoutApp>
      <p>Recuerdo COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Recuerdo);
