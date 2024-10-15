import { View } from "react-native";
import { styles } from "./AddReviewRestaurantScreen.styles";
import { AirbnbRating, Button, Input, Text } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddReviewRestaurantScreen.data";

export function AddReviewRestaurantScreen(props) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: values => {
      console.log(values);
    },
    validateOnChange: true,
  });

  return (
    <View style={styles.container}>
      <View>
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
