import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();


const FavoritiesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.favorities.index} component={FavoritesScreen} options={{ title: "Favorities" }} />
        </Stack.Navigator >
    );
};
export default FavoritiesStack;
