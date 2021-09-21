import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default () => {
  const [location, setLocation] = useState(null);
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync({});

    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    try {
      getLocation();
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }, []);

  return location;
};
