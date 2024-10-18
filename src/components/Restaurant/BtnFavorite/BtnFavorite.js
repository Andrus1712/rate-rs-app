import { View } from "react-native";
import { Icon } from "@rneui/base";
import { styles } from "./BtnFavorite.styles";
import uuid from "react-native-uuid";
import { auth, db } from "../../../utils";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function BtnFavorite(props) {
  const { idRestaurant } = props;

  const [completedFavorite, setCompletedFavorite] = useState(false);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorite();
      setCompletedFavorite(response.length > 0);
    })();
  }, [idRestaurant, isReload]);

  const onReload = () => {
    setIsReload(prevState => !prevState);
  };

  const getFavorite = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth.currentUser.uid)
    );
    const result = await getDocs(q);
    return result.docs;
  };

  const addFavorites = async () => {
    try {
      const idFavorite = uuid.v4();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };

      await addDoc(collection(db, "favorites"), data);
      onReload();
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavorites = async () => {
    try {
      const response = await getFavorite();
      for (const e of response) {
        await deleteDoc(doc(db, "favorites", e.id));
      }
      onReload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        name={completedFavorite ? "heart" : "heart-outline"}
        type={"material-community"}
        color={"#00a680"}
        size={35}
        onPress={() => (completedFavorite ? removeFavorites() : addFavorites())}
      />
    </View>
  );
}
