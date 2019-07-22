import React, { Component } from "react";
import LayoutApp from "./misc/LayoutApp";
import { withAuthConsumer } from "../contexts/AuthStore";
import { Card } from "antd";
import amadeusService from "../services/AmadeusService";

class Reservo extends Component {
  state = {
    vuelo: {
      id: "1563438526994-487830290",
      offerItems: [
        {
          services: [
            {
              segments: [
                {
                  flightSegment: {
                    departure: {
                      iataCode: "MAD",
                      terminal: "4S",
                      at: "2019-08-19T12:45:00+02:00"
                    },
                    arrival: {
                      iataCode: "BOS",
                      terminal: "E",
                      at: "2019-08-19T14:35:00-04:00"
                    },
                    duration: "0DT7H50M"
                  },
                  pricingDetailPerAdult: {
                    travelClass: "ECONOMY",
                    availability: 9
                  }
                }
              ]
            },
            {
              segments: [
                {
                  flightSegment: {
                    departure: {
                      iataCode: "BOS",
                      terminal: "E",
                      at: "2019-10-08T17:20:00-04:00"
                    },
                    arrival: {
                      iataCode: "MAD",
                      terminal: "4S",
                      at: "2019-10-09T06:20:00+02:00"
                    },
                    duration: "0DT7H0M"
                  },
                  pricingDetailPerAdult: {
                    travelClass: "ECONOMY",
                    availability: 9
                  }
                }
              ]
            }
          ],
          price: {
            total: "579.51",
            totalTaxes: "195.51"
          }
        }
      ]
    },
    // TODO
    // query: {
    //   originCity: this.props.search.originCity,
    //   destinationCity: this.props.search.destinationCity,
    //   departureDate: this.props.search.departureDate,
    //   returnDate: this.props.search.returnDate
    // },
    results: []
  };

  getVuelo = () => {
    amadeusService.getFlight(this.state.query).then(
      vuelo => {
        console.log(vuelo);
        this.setState({ results: vuelo[0] });
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    const { vuelo } = this.state;

    // TODO
    // this.getVuelo();

    return (
      <LayoutApp>
        <h3 style={{ textAlign: "center" }}>Mi vuelo</h3>
        <div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Card
              title={
                vuelo.offerItems[0].services[0].segments[0].flightSegment
                  .departure.iataCode +
                " - " +
                vuelo.offerItems[0].services[0].segments[0].flightSegment
                  .arrival.iataCode
              }
              style={{ width: 400 }}
            >
              <p>
                Salida:{" "}
                {
                  vuelo.offerItems[0].services[0].segments[0].flightSegment
                    .departure.at
                }
              </p>
              <p>
                Terminal:{" "}
                {
                  vuelo.offerItems[0].services[0].segments[0].flightSegment
                    .departure.terminal
                }
              </p>
              <p>
                Llegada:{" "}
                {
                  vuelo.offerItems[0].services[0].segments[0].flightSegment
                    .arrival.at
                }
              </p>
              <p>
                Terminal:{" "}
                {
                  vuelo.offerItems[0].services[0].segments[0].flightSegment
                    .arrival.terminal
                }
              </p>
              <p>
                Duración:{" "}
                {
                  vuelo.offerItems[0].services[0].segments[0].flightSegment
                    .duration
                }
              </p>
            </Card>
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Card
              title={
                vuelo.offerItems[0].services[1].segments[0].flightSegment
                  .departure.iataCode +
                " - " +
                vuelo.offerItems[0].services[1].segments[0].flightSegment
                  .arrival.iataCode
              }
              style={{ width: 400 }}
            >
              <p>
                Salida:{" "}
                {
                  vuelo.offerItems[0].services[1].segments[0].flightSegment
                    .departure.at
                }
              </p>
              <p>
                Terminal:{" "}
                {
                  vuelo.offerItems[0].services[1].segments[0].flightSegment
                    .departure.terminal
                }
              </p>
              <p>
                Llegada:{" "}
                {
                  vuelo.offerItems[0].services[1].segments[0].flightSegment
                    .arrival.at
                }
              </p>
              <p>
                Terminal:{" "}
                {
                  vuelo.offerItems[0].services[1].segments[0].flightSegment
                    .arrival.terminal
                }
              </p>
              <p>
                Duración:{" "}
                {
                  vuelo.offerItems[0].services[1].segments[0].flightSegment
                    .duration
                }
              </p>
            </Card>
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Card title="Precio" style={{ width: 400 }}>
              <p>
                Total: <strong>{vuelo.offerItems[0].price.total}</strong> USD
              </p>
              <p>Tasas: {vuelo.offerItems[0].price.totalTaxes} USD</p>
            </Card>
          </div>
        </div>
      </LayoutApp>
    );
  }
}

export default withAuthConsumer(Reservo);
