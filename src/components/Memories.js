import React, { useState } from 'react';
import LayoutApp from "./misc/LayoutApp";
import ReactMapGL, { Marker } from "react-map-gl";

function Memories() {
  const [viewport, setViewport] = useState({
    latitude: 42.3736153,
    longitude: -71.0624059,
    width: "50vw",
    height: "50vh",
    zoom: 10
  });
  return(
    <LayoutApp>
      <p>Memories COMPONENT</p>
      <ReactMapGL 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
      {...viewport}
      onViewportChange={viewport => { setViewport(viewport); } }
      mapStyle="mapbox://styles/davizs/ck16wmbej483v1cpl9ofaevcl"
      >
        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>CASA</Marker>
      </ReactMapGL>
    </LayoutApp>
  )
}

export default Memories;
