import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Disfruto extends Component {
  render() {
    return(
      <LayoutApp>
      <p>Disfruto COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Disfruto);
