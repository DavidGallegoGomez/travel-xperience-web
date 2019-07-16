import React, { Component } from 'react';
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";

class Preparo extends Component {
  render() {
    return(
      <LayoutApp>
      <p>Preparo COMPONENT</p>
      </LayoutApp>
    )
  }
}

export default withAuthConsumer(Preparo);
