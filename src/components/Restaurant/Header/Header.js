import { View } from "react-native";
import { Divider, Text } from "@rneui/base";
import { styles } from "./Header.styles";
import { Rating } from "@kolking/react-native-rating";

export function Header({ restaurant }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{restaurant.name}</Text>
        <View>
          <Rating size={20} rating={restaurant.ratingMedia ? restaurant.ratingMedia : 0} disabled />
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
