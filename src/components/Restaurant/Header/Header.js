import { View } from "react-native";
import { Rating, Text } from "@rneui/base";
import { styles } from "./Header.styles";

export function Header(props) {
  const { restaurant } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{restaurant.name}</Text>
        <Rating
          showRating
          imageSize={10}
          readonly={true}
          style={styles.rating}
        />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
