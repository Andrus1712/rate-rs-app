import { LogBox, StatusBar } from "react-native";
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from "@react-navigation/native";
import { initFirebase } from "./src/utils";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  );
}