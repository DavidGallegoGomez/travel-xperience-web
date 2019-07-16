import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Register from "./components/auth/Register";
import PrivateRoute from "./guards/PrivateRoute";
import Road from "./components/Road";
import Busco from "./components/Busco";
import Reservo from "./components/Reservo";
import Preparo from "./components/Preparo";
import Disfruto from "./components/Disfruto";
import Recuerdo from "./components/Recuerdo";

class App extends Component {
  state = { collapsed: true };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/road" component={Road} />
        <PrivateRoute exact path="/busco" component={Busco} />
        <PrivateRoute exact path="/reservo" component={Reservo} />
        <PrivateRoute exact path="/preparo" component={Preparo} />
        <PrivateRoute exact path="/disfruto" component={Disfruto} />
        <PrivateRoute exact path="/recuerdo" component={Recuerdo} />
      </Switch>
    );
  }
}

export default App;
