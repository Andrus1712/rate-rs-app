import { View } from "react-native";
import { AirbnbRating, Divider, Text } from "@rneui/base";
import { styles } from "./Header.styles";

export function Header(props) {
  const { restaurant } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{restaurant.name}</Text>
        <View>
          <AirbnbRating
            count={5}
            isDisabled={true}
            defaultRating={restaurant.ratingMedia ? restaurant.ratingMedia : 0}
            size={20}
            showRating={false}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
