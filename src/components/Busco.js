import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Busco extends Component {
  render() {
    return(
      <LayoutApp>
      <p>BUSCO COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Busco);
