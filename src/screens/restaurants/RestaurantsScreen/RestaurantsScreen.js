import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { db, getAuth, screen } from "../../../utils";
import { styles } from "./RestaurantsScreen.styles";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components";
import { ListRestaurants } from "../ListResturants";

export const RestaurantsScreen = props => {
  const { navigate } = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "restaurants"), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigate(screen.restaurant.tab, { screen: screen.restaurant.add });
  };

  if (!restaurants) {
    return <LoadingModal show={true} text={"loading data"} progress={0} />;
  }

  return (
    <View style={styles.container}>
      <ListRestaurants restaurants={restaurants} />
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
