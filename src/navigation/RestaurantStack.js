import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import RestaurantScreen from "../screens/restaurants/RestaurantScreen";
import AddRestaurantScreen from "../screens/restaurants/AddRestaurantScreen";

const Stack = createNativeStackNavigator();

const RestaurantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.index}
        component={RestaurantScreen}
        options={{ title: "Restaurant" }}
      />
      <Stack.Screen
        name={screen.restaurant.add}
        component={AddRestaurantScreen}
        options={{ title: "Add Restaurant" }}
      />
    </Stack.Navigator>
  );
};
export default RestaurantStack;
