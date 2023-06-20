import React, { memo, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import icons from "../../../utils/icon/icons";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const { HiLocationMarker } = icons;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Map = ({ coords, address }) => {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      {address && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={coords}
        >
          <AnyReactComponent
            lat={coords?.lat || defaultProps.center.lat}
            lng={coords?.lng || defaultProps.center.lng}
            text={<HiLocationMarker color="red" size={24} />}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default memo(Map);
