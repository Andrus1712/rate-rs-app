import { View } from "react-native";
import { styles } from "./BtnReviewForm.styles";
import { Button, Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function BtnReviewForm(props) {
  const { uidRestaurant, idRestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setHasLogged(!!user);
    });
  }, []);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };

  const goToOpinionsScreen = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.review,
      params: {
        idRestaurant,
        uidRestaurant,
      },
    });
  };

  return (
    <View style={styles.container}>
      {hasLogged ? (
        <Button
          title={"Write opinion"}
          icon={{ type: "material-community", name: "square-edit-outline", color: "#00a680" }}
          buttonStyle={styles.btn}
          titleStyle={styles.btnText}
          onPress={goToOpinionsScreen}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          <Text style={styles.textClick}>Sign in</Text> to white a opinion
        </Text>
      )}
    </View>
  );
}
