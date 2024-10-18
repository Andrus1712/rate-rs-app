import { View } from "react-native";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../utils";
import { RestaurantRaking } from "../components/Restaurants";

const RankingScreen = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "restaurants"), orderBy("ratingMedia", "desc"), limit(4));
    onSnapshot(q, snapshot => {
      const array = [];
      for (const doc of snapshot.docs) {
        array.push(doc.data());
      }
      setRestaurants(array);
    });
  }, []);

  return (
    <View>
      <RestaurantRaking restaurants={restaurants} />
    </View>
  );
};
export default RankingScreen;
