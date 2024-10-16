import { View } from "react-native";
import { styles } from "./AddReviewRestaurantScreen.styles";
import { AirbnbRating, Button, Input, Text } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddReviewRestaurantScreen.data";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { db, getAuth } from "../../../utils";
import { addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function AddReviewRestaurantScreen(props) {
  const { route } = props;

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async values => {
      try {
        const id = uuid.v4();
        const newData = values;
        newData.id = id;
        newData.idRestaurant = route.params.idRestaurant;
        newData.idUser = getAuth().currentUser.uid;
        newData.avatar = getAuth().currentUser.photoURL;
        newData.createdAt = new Date();

        await addDoc(collection(db, "reviews"), newData).catch(err => {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error",
            text2: err,
          });
        });

        await updateRestaurants();

        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error1",
          text2: error,
        });
      }
    },
    validateOnChange: true,
  });

  const updateRestaurants = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", route.params.idRestaurant)
    );

    onSnapshot(q, async snapshot => {
      const ratings = snapshot.docs.map(review => {
        const dataRestaurant = review.data();
        return dataRestaurant.rating;
      });
      const mediaRatings = media(ratings);

      const restaurantRef = doc(db, "restaurants", route.params.uidRestaurant);
      await updateDoc(restaurantRef, {
        ratingMedia: mediaRatings,
      });
    });
  };

  const media = data => {
    let cont = 0;
    data.map(el => (cont += el));
    if (cont >= 0) {
      return cont / data.length;
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{route.params.idRestaurant}</Text>
        <Text>{route.params.uidRestaurant}</Text>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={35}
            onFinishRating={rating => formik.setFieldValue("rating", rating)}
          />
          <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
        </View>
        <View>
          <Input
            label={"title"}
            onChangeText={value => formik.setFieldValue("title", value)}
            errorMessage={formik.errors.title}
          />
          <Input
            label={"Comment"}
            multiline={true}
            placeholder={"Make your comment"}
            inputContainerStyle={styles.textArea}
            onChangeText={value => formik.setFieldValue("comment", value)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title={"Save"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
