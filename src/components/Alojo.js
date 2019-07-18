import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import { Card } from "antd";

class Alojo extends Component {
  hotel = {
    "hotel": {
        "name": "BOSTON MARRIOTT COPLEY PLACE",
        "rating": "4",
        "cityCode": "BOS",
        "hotelDistance": {
            "distance": 2.3,
            "distanceUnit": "KM"
        },
        "address": {
            "lines": [
                "110 HUNTINGTON AVENUE"
            ],
            "postalCode": "02116"
        },
        "contact": {
            "phone": "1-617-2365800"
        },
    },
    "offers": [
        {
            "id": "588B366268FB072EB88D154975493860F187A9398231CB7D8287F74FA0A3569F",
            "room": {
                "type": "REG",
                "typeEstimated": {
                    "beds": 2,
                    "bedType": "DOUBLE"
                }
            },
            "price": {
                "currency": "USD",
                "base": "369.00",
                "total": "422.32"
            }
        }
    ]
}

  render() {
    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center" }}>Alojamiento</h3>

        <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
          <Card title={ this.hotel.hotel.name } style={{ width: 400 }}>
            <p>Dirección: { this.hotel.hotel.address.lines }</p>
            <p>ZIP: {this.hotel.hotel.address.postalCode} {this.hotel.hotel.cityCode}</p>
            <p>Tipo habitación: { this.hotel.offers[0].room.typeEstimated.bedType }</p>
            <p>Precio: <strong>{ this.hotel.offers[0].price.total }</strong> { this.hotel.offers[0].price.currency }</p>
          </Card>
        </div>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Alojo);
