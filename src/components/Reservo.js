import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Reservo extends Component {
  render() {
    return(
      <LayoutApp>
      <p>Reservo COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Reservo);
