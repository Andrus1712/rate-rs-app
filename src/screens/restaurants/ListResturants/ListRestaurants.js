import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./ListResturants.styles";
import { Image, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function ListRestaurants(props) {
  const { restaurants } = props;
  const navigation = useNavigation();

  const goToRestaurant = restaurant => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.show,
      params: {
        id: restaurant.id,
        name: restaurant.name,
      },
    });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={doc => {
        const restaurant = doc.item.data();
        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.restaurantList}>
              <Image style={styles.image} source={{ uri: restaurant.images[0] }} />
              <View>
                <Text style={styles.textName}>{restaurant.name}</Text>
                <Text style={styles.textInfo}>{restaurant.address}</Text>
                <Text style={styles.textInfo}>{restaurant.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
