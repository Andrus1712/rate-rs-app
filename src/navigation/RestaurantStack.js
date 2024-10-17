import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RestaurantsScreen } from "../screens/restaurants/RestaurantsScreen";
import { AddRestaurantScreen } from "../screens/restaurants/AddRestaurantScreen";
import { RestaurantScreen } from "../screens/restaurants/RestaurantScreen";
import { AddReviewRestaurantScreen } from "../screens/restaurants/AddReviewRestaurantScreen";

const Stack = createNativeStackNavigator();

const RestaurantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.index}
        component={RestaurantsScreen}
        options={{ title: "Restaurant" }}
      />
      <Stack.Screen
        name={screen.restaurant.add}
        component={AddRestaurantScreen}
        options={{ title: "Add Restaurant" }}
      />
      <Stack.Screen
        name={screen.restaurant.show}
        component={RestaurantScreen}
        options={({ route }) => ({
          title: route.params.name ? route.params.name : "title",
        })}
      />
      <Stack.Screen
        name={screen.restaurant.review}
        component={AddReviewRestaurantScreen}
        options={{ title: "Reviews" }}
      />
    </Stack.Navigator>
  );
};
export default RestaurantStack;
