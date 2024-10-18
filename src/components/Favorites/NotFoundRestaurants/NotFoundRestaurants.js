import { View } from "react-native";
import { Icon, Text } from "@rneui/base";
import { styles } from "./NotFoundRestaurants.styles";

export function NotFoundRestaurants(props) {
  return (
    <View style={styles.container}>
      <Icon name={"alert-outline"} type={"material-community"} size={80} color="#000" />
      <Text style={styles.text}>Not favorites found</Text>
    </View>
  );
}
