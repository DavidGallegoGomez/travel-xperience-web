import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
// import Profile from "./components/auth/Profile";
import Register from "./components/auth/Register";
import PrivateRoute from "./guards/PrivateRoute";
// import Road from "./components/Road";
import Busco from "./components/busco/Busco";
import Reservo from "./components/Reservo";
// import Preparo from "./components/Preparo";
import Disfruto from "./components/Disfruto";
// import Recuerdo from "./components/Recuerdo";
import SearchCities from "./components/SearchCities";
import SearchCities2 from "./components/SearchCities2";
import Alojo from "./components/Alojo";

class App extends Component {
  state = {
    collapsed: true,
    search: {}
  };

  onSearch = (searchDetails) => {
    this.setState({ search: searchDetails })
  }


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
        {/* <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/road" component={Road} /> */}
        <PrivateRoute exact path="/busco" component={() => <Busco onSearch={this.onSearch}/>} />
        <PrivateRoute exact path="/reservo" component={() => <Reservo search={this.state.search}/>} />
        {/* <PrivateRoute exact path="/preparo" component={Preparo} /> */}
        <PrivateRoute exact path="/alojamiento" component={() => <Alojo search={this.state.search}/>} />
        <PrivateRoute exact path="/disfruto" component={() => <Disfruto search={this.state.search}/>} />
        {/* <PrivateRoute exact path="/recuerdo" component={Recuerdo} /> */}
        <PrivateRoute exact path="/search-cities" component={SearchCities} />
        <PrivateRoute exact path="/search" component={SearchCities2} />
      </Switch>
    );
  }
}

export default App;
