import MapView, { Marker } from "react-native-maps";
import { styles } from "./Map.styles";
import openMap from "react-native-open-maps";

export function Map(props) {
  const { location, name } = props;
  const onOpenMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };
  return (
    <MapView initialRegion={location} style={styles.mapContainer} onPress={onOpenMap}>
      <Marker coordinate={location} />
    </MapView>
  );
}
