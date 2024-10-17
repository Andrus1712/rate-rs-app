import { View } from "react-native";
import { styles } from "./BtnReviewForm.styles";
import { Button, Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, getAuth, screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export function BtnReviewForm(props) {
  const { uidRestaurant, idRestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setHasLogged(!!user);
    });
  }, [auth.currentUser]);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async snapshot => {
        if (snapshot.docs.length > 0) {
          setHasReviewed(true);
        }
      });
    }
  }, [hasLogged]);

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

  if (hasLogged && hasReviewed) {
    return (
      <View style={styles.container}>
        <Text style={styles.textValidateReviewed}>Already reviewed this restaurant</Text>
      </View>
    );
  }

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
