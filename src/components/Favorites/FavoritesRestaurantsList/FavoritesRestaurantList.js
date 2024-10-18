import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./FavoritesRestaurantList.styles";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { Icon, Image } from "@rneui/base";
import { deleteDoc, doc } from "firebase/firestore";

export function FavoritesRestaurantList(props) {
  const { restaurantsList } = props;

  const navigation = useNavigation();

  const goToRestaurant = data => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.show,
      params: {
        name: data.name,
        id: data.id,
      },
    });
  };

  const removeFavorites = async id => {
    try {
      await deleteDoc(doc(db, "favorites", id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FlatList
      data={restaurantsList}
      keyExtractor={item => item.id}
      style={styles.container}
      indicatorStyle={"black"}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => goToRestaurant(item)}>
            <View style={styles.containerItem}>
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <View style={styles.descriptionItem}>
                <Text style={styles.titleName}>{item.name}</Text>
                <Icon
                  containerStyle={styles.iconStyle}
                  name={"heart"}
                  type={"material-community"}
                  fontSize={35}
                  color="#00a680"
                  onPress={() => removeFavorites(item.udoc)}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
