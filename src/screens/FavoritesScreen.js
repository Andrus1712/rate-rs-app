import { View } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, getAuth } from "../utils";
import {
  FavoritesRestaurantList,
  NotFoundRestaurants,
  UserNotLogged,
} from "../components/Favorites";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { Loading } from "../components";

const FavoritesScreen = props => {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setHasLogged(!!user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "favorites"), where("idUser", "==", auth.currentUser.uid));
    onSnapshot(q, async snapshot => {
      const fetchedFavorites = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();

        const infoRestaurant = await getRestaurantById(data.idRestaurant);
        infoRestaurant.udoc = doc.id;
        fetchedFavorites.push(infoRestaurant);
      }
      setRestaurantsList(fetchedFavorites);
    });

    return () => {
      setRestaurantsList([]);
    };
  }, []);

  async function getRestaurantById(idRestaurant) {
    const q = query(collection(db, "restaurants"), where("id", "==", idRestaurant));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      // querySnapshot.forEach(doc => {});
      return querySnapshot.docs[0].data();
    }
  }

  if (!hasLogged) {
    return <UserNotLogged />;
  }

  if (!restaurantsList) {
    return <Loading show={true} text="Loading restaurants..." proggress={0} />;
  }

  if (restaurantsList.length === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View>
      <FavoritesRestaurantList restaurantsList={restaurantsList} />
    </View>
  );
};
export default FavoritesScreen;
