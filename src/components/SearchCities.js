import React, { Component } from "react";
import amadeusService from "../services/AmadeusService";

class SearchCities extends Component {
  state = {
    //query: "",
    query: {
      keyword: "",
      countryCode: "US"
    },
    results: []
  };

  getInfo = () => {
    amadeusService.getCities(this.state.query).then(
      data => {
        console.log(data);
        this.setState({ results: data });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleInputChange = () => {
    // this.setState({ query: this.search.value },
    this.setState({ query: {
      ...this.state.query,
      keyword: this.search.value  
    } },
      () => {
        // if (this.state.query.keyword && this.state.query.keyword.length > 2) {
        if (this.state.query.keyword && this.state.query.keyword.length > 2) {
          this.getInfo();
        }
      }
    );
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query.keyword}</p>
        <p>{this.state.query.countryCode}</p>
      </form>
    );
  }
}

export default SearchCities;
