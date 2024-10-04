import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { getAuth, screen } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const RestaurantScreen = props => {
  const { navigate } = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);
  const goToAddRestaurant = () => {
    navigate(screen.restaurant.tab, { screen: screen.restaurant.add });
  };
  return (
    <View style={styles.container}>
      <Text>Restaurants Screen</Text>
      {currentUser !== null && (
        <Icon
          name={"plus"}
          type={"material-community"}
          color="#00a680"
          reverse={true}
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
};
