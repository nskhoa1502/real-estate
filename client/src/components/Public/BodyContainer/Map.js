import React, { memo, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import icons from "../../../utils/icon/icons";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const Position = ({ icon }) => <div>{icon}</div>;

const { HiLocationMarker } = icons;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Map = ({ address }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const getPostCoords = async () => {
      const formattedAddress = address?.includes(":")
        ? address?.split(":")[1].trim()
        : address;
      // console.log(formattedAddress);
      try {
        const results = await geocodeByAddress(formattedAddress);
        // console.log(results);
        const { lat, lng } = await getLatLng(results[0]);
        console.log("Successfully got latitude and longitude", { lat, lng });
        setCoords({ lat, lng });
      } catch (error) {
        console.error(
          "Error occurred while getting latitude and longitude",
          error
        );
      }
    };
    if (address) {
      getPostCoords();
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoords({ lat: latitude, lng: longitude });
      });
    }
  }, [address, JSON.stringify(coords)]);
  return (
    <div className="h-[300px] w-full relative">
      {address && (
        <div className="absolute top-3 left-3 max-w-[300px] z-30 rounded-md bg-white shadow-md p-4 text-xs">
          {address}
        </div>
      )}
      {address && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={coords}
        >
          <Position
            lat={coords?.lat || defaultProps.center.lat}
            lng={coords?.lng || defaultProps.center.lng}
            icon={<HiLocationMarker color="red" size={24} />}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default memo(Map);
