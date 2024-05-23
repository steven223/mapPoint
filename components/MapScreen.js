import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Text,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "sk.eyJ1Ijoic3RldmVuMjIzIiwiYSI6ImNsd2pqNjNpbTBhNG4ycm56YWtwNnlxbWkifQ.Lb33hU4Pa6r0MxAVY-3aPg"
);

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.warn("Location permission denied");
      }
    } else {
      getLocation();
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      timeout: 5000,
    });

    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          showsUserLocation={true}
          followsUserLocation={true}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
