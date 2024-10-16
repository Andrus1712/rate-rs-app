import { Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../utils";

import { styles } from "./RestaurantScreen.styles";
import { CarouselComponent, Loading } from "../../../components";
import { BtnReviewForm, Header, Info } from "../../../components/Restaurant";

export function RestaurantScreen(props) {
  const { route } = props;

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);

    const q = query(
      collection(db, "restaurants"),
      where("id", "==", route.params.id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, snapshot => {
      if (!snapshot.empty) {
        const singleDoc = snapshot.docs[0];
        const dataRestaurant = singleDoc.data();
        dataRestaurant.uid = singleDoc.id;
        setRestaurant(dataRestaurant);
      } else {
        console.log("Not restaurant found");
      }
    });
  }, [route.params.id]);

  const { width } = Dimensions.get("window");

  if (!restaurant) return <Loading show={true} text={"Loading..."} />;

  return (
    <ScrollView style={styles.contentContainer}>
      <CarouselComponent images={restaurant.images} width={width} height={250} />
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={restaurant.id} uidRestaurant={restaurant.uid} />
    </ScrollView>
  );
}
