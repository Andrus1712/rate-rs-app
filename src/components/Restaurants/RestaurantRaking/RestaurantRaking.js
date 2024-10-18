import { FlatList, TouchableOpacity, View } from "react-native";
import { AirbnbRating, Icon, Image, Text } from "@rneui/base";
import { styles } from "./RestaurantRaking.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function RestaurantRaking(props) {
  const { restaurants } = props;

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

  const RenderMedal = ({ color }) => {
    return (
      <Icon
        name={"medal-outline"}
        type={"material-community"}
        color={color}
        containerStyle={styles.medal}
        size={40}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          let color = "";
          if (index === 0) color = "#FFD700";
          if (index === 1) color = "#BEBEBE";
          if (index === 2) color = "#CD7F32";
          return (
            <TouchableOpacity onPress={() => goToRestaurant(item)}>
              <View style={styles.containerItem}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />
                <View style={styles.descriptionItem}>
                  <View style={styles.nameContent}>
                    {index <= 2 ? <RenderMedal color={color} /> : null}
                    <Text style={styles.titleName}>{item.name}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <AirbnbRating
                      count={5}
                      isDisabled={true}
                      defaultRating={item.ratingMedia}
                      size={20}
                      showRating={false}
                    />
                    <Text style={styles.titleNameRating}>
                      {parseFloat(item.ratingMedia).toFixed(1)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
