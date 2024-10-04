import { View } from "react-native";
import { Modal } from "../../../Shared/Modal";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./MapForm.styles";
import { Button } from "@rneui/base";

export function MapForm(props) {
  const { show, close, formik } = props;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Activate location in app",
          text2: status,
        });
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = async location => {
    await formik.setFieldValue("location", location);
    console.log("saveLocation", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          initialRegion={currentLocation}
          showsUserLocation={true}
          style={styles.mapStyle}
          onRegionChange={locationTemp => {
            setCurrentLocation(locationTemp);
          }}>
          <Marker draggable coordinate={currentLocation}></Marker>
        </MapView>
      </View>
      <View style={styles.mapActions}>
        <Button
          title={"Save"}
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={() => saveLocation(currentLocation)}
        />
        <Button
          title={"Close"}
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
          onPress={() => close()}
        />
      </View>
    </Modal>
  );
}
