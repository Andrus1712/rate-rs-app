import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import RankingScreen from "../screens/RankingScreen";

const Stack = createNativeStackNavigator();


const RankingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.ranking.index} component={RankingScreen} options={{ title: "Ranking" }} />
        </Stack.Navigator >
    );
};
export default RankingStack;