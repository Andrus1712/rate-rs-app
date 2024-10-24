import { Text, View } from "react-native";
import { styles } from "./Review.styles";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../utils";
import { Avatar, ListItem } from "@rneui/base";
import { Loading } from "../../Shared";
import { Rating } from "@kolking/react-native-rating";

export function Reviews(props) {
  const { idRestaurant } = props;
  const [reviewsList, setReviewsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, async snapshot => {
      if (!snapshot.empty) {
        const reviews = [];
        for (const reviewDoc of snapshot.docs) {
          const index = snapshot.docs.indexOf(reviewDoc);
          const reviewData = reviewDoc.data();
          const userId = reviewData.idUser;

          const userData = await getUserInfo(userId);

          reviews.push({
            ...reviewData,
            user: userData,
            key: reviewDoc.id,
          });
        }

        setReviewsList(reviews);
      } else {
        setReviewsList(null);
      }
      setIsLoading(false);
    });
  }, [idRestaurant]);

  const getUserInfo = async userId => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No se encontró información del usuario.");
    }
  };

  if (!reviewsList) {
    return null;
  }

  if (!reviewsList) {
    return <Loading show={true} text={"Loading"} />;
  }

  return (
    <View style={styles.container}>
      {reviewsList.map((review, i) => {
        return (
          <ListItem key={review.key} bottomDivider containerStyle={styles.reviewsContainer}>
            <Avatar
              source={{ uri: review.user.avatar ? review.user.avatar : review.avatar }}
              size={50}
              rounded={true}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{review.title}</ListItem.Title>
              <View style={styles.subTitle}>
                <Text style={styles.comment}>{review.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <View>
                    <Rating size={15} rating={review.rating} disabled />
                  </View>
                  <Text style={styles.dateContent}>
                    {review.createdAt.toDate().toLocaleDateString("es-CO")}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
