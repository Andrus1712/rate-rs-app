import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { screen } from "../utils";
import RestaurantStack from "./RestaurantStack";
import FavoritiesStack from "./FavoritiesStack";
import RankingStack from "./RankingStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tabs = createBottomTabNavigator();

const AppNavigation = () => {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#00a680",
            tabBarInactiveTintColor: "#646464",
            headerShown: false,
            tabBarIcon: ({ color, size }) => tabBarScreenOptions(route, color, size)
        })}>
            <Tabs.Screen name={screen.restaurant.tab} component={RestaurantStack} options={{ title: "Restaurants" }} />
            <Tabs.Screen name={screen.favorities.tab} component={FavoritiesStack} options={{ title: "Favorities" }} />
            <Tabs.Screen name={screen.ranking.tab} component={RankingStack} options={{ title: "Ranking" }} />
            <Tabs.Screen name={screen.search.tab} component={SearchStack} options={{ title: "Search" }} />
            <Tabs.Screen name={screen.account.tab} component={AccountStack} options={{ title: "Account" }} />
        </Tabs.Navigator>
    );
};

function tabBarScreenOptions(router, color, size) {
    let iconName;
    if (router.name === screen.restaurant.tab) {
        iconName = "compass-outline";
    }
    if (router.name === screen.favorities.tab) {
        iconName = "heart-outline";
    }
    if (router.name === screen.ranking.tab) {
        iconName = "star-outline";
    }
    if (router.name === screen.search.tab) {
        iconName = "magnify";
    }
    if (router.name === screen.account.tab) {
        iconName = "account";
    }

    return (
        <Icon type="material-community" name={iconName} color={color} size={size} />
    );
}


export default AppNavigation;