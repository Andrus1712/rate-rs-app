import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { screen } from "../../utils";

const RestaurantScreen = props => {
  const { navigate } = useNavigation();

  const goToAddRestaurant = () => {
    navigate(screen.restaurant.tab, { screen: screen.restaurant.add });
  };
  return (
    <View>
      <Text>Restaurants Screen</Text>
      <Button onPress={() => goToAddRestaurant()}>Crear restaurante</Button>
    </View>
  );
};
export default RestaurantScreen;
