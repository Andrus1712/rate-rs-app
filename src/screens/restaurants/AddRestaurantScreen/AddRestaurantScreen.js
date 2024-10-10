import { View } from "react-native";
import { styles } from "./AddRestaurantScreen.styles";
import { ImageRestaurant, InfoForm, UploadImageForm } from "../../../components/Restaurants";
import { Button } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import { useState } from "react";
import { LoadingModal } from "../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const AddRestaurantScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const [progress, setProgress] = useState(0);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values, actions) => {
      console.log(values);
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
