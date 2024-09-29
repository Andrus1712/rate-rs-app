import {LogBox, StatusBar} from "react-native";
import AppNavigation from './src/navigation/AppNavigation';
import {NavigationContainer} from "@react-navigation/native";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

        <Toast/>
    </>
  );
}
