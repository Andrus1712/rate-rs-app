import { View } from "react-native";
import { styles } from "./AddRestaurantScreen.styles";
import { ImageRestaurant, InfoForm, UploadImageForm } from "../../../components/Restaurants";
import { Button } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { useState } from "react";
import { LoadingModal } from "../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import uuid from "react-native-uuid";
import { db } from "../../../utils";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export const AddRestaurantScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values, actions) => {
      try {
        const newData = values;
        newData.id = uuid.v4();
        newData.createdAt = new Date();

        await addDoc(collection(db, "restaurants"), newData)
          .then(() => {
            navigation.goBack();
          })
          .catch(err => {
            console.log({ err });
          });
      } catch (error) {
        console.log(error);
      }
    },
    validateOnChange: false,
  });
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <ImageRestaurant formik={formik} />
        <InfoForm formik={formik} />

        <UploadImageForm
          formik={formik}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          setProgress={setProgress}
        />

        <Button
          title={"Create"}
          buttonStyle={styles.addRestaurant}
          onPress={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
        />

        <LoadingModal show={loading} text={loadingText} progress={progress} />
      </View>
    </KeyboardAwareScrollView>
  );
};
