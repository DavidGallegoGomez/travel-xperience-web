import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Alojo extends Component {
  render() {
    return(
      <LayoutApp>
      <p>Alojamiento COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Alojo);
