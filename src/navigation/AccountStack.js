import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/account/AccountScreen";
import { LoginScreen } from "../screens/account/LoginScreen";
import { RegisterScreen } from "../screens/account/ResgisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator();


const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.account.index} component={AccountScreen} options={{ title: "Account" }} />
            <Stack.Screen name={screen.account.login} component={LoginScreen} options={{ title: "Login" }} />
            <Stack.Screen name={screen.account.register} component={RegisterScreen} options={{ title: "Register" }} />
        </Stack.Navigator >
    );
};
export default AccountStack;