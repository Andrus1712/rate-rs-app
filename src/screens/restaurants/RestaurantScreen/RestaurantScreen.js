import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../utils";

export function RestaurantScreen(props) {
  const { route } = props;

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);

    console.log(route.params.id);

    const q = query(
      collection(db, "restaurants"),
      where("id", "==", route.params.id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, snapshot => {
      if (!snapshot.empty) {
        const singleDoc = snapshot.docs[0];
        console.log({ singleDoc });
        setRestaurant(singleDoc);
      } else {
        console.log("Not restaurant found");
      }
    });
  }, [route.params.id]);

  return (
    <View>
      <Text>{JSON.stringify(route.params.id)}</Text>
      <Text>{JSON.stringify(restaurant)}</Text>
    </View>
  );
}
