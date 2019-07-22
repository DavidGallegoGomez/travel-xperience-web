import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import { Card } from "antd";
import amadeusService from "../services/AmadeusService";

class Disfruto extends Component {
  state = {
  poi : {
    "data": [
        {
            "name": "Palau de la Música Catalana",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "activities",
                "sights",
                "landmark"
            ]
        },
        {
            "name": "Camp Nou",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "sports",
                "stadium",
                "sportclub"
            ]
        },
        {
            "name": "Casa Batlló",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "museum",
                "sights",
                "landmark"
            ]
        },
        {
            "name": "La Boqueria",
            "category": "RESTAURANT",
            "tags": [
                "restaurant"
            ]
        },
        {
            "name": "La Sagrada Familia",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "church",
                "temple",
                "sights"
            ]
        },
        {
            "name": "Teresa Carles",
            "category": "RESTAURANT",
            "tags": [
                "restaurant",
                "vegetarian"
            ]
        },
        {
            "name": "Can Paixano",
            "category": "RESTAURANT",
            "tags": [
                "restaurant",
                "cheap",
                "tapas"
            ]
        },
        {
            "name": "Casa Milà",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "museum",
                "sights",
                "landmark"
            ]
        },
        {
            "name": "Park Güell",
            "category": "SIGHTS",
            "tags": [
                "sightseeing",
                "museum",
                "sights",
                "historicplace"
            ]
        },
        {
            "name": "Cera 23",
            "category": "RESTAURANT",
            "tags": [
                "restaurant"
            ]
        }
    ]
},
// TODO
    // query: {
    //   destinationCity: this.props.search.destinationCity
    //   latitude: this.props.search.latitude,
    //   longitude: this.props.search.longitude
    // },

    results: []
  }

  getFun = () => {
    amadeusService.getPOI(this.state.query).then(
      poi => {
        console.log(poi);
        this.setState({ results: poi });
      },
      error => {
        console.log(error);
      }
    );
  };
  
  render() {
    const { poi } = this.state;

    // TODO
    // this.getFun();

    const poiOpts = poi.data.map(poi => (
      <div key={poi.name} style={{ padding: "20px", display: "flex", justifyContent: "center" }} >
        <Card title={poi.name} style={{ width: 300 }}>
          <p>Categoría: {poi.category}</p>
          <p>Etiquetas: {poi.tags[0]} {poi.tags[1]}</p>
        </Card>
      </div>
    ));
    
    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center" }}>Disfruto en destino</h3>

        {poiOpts}
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Disfruto);
