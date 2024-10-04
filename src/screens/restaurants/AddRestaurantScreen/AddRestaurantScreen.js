import { View } from "react-native";
import { styles } from "./AddRestaurantScreen.styles";
import { InfoForm } from "../../../components/Restaurants";
import { Button } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";

export const AddRestaurantScreen = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values, actions) => {
      console.log("send form");
    },
  });
  return (
    <View style={styles.container}>
      <InfoForm formik={formik} />

      <Button
        title={"Create"}
        buttonStyle={styles.addRestaurant}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
