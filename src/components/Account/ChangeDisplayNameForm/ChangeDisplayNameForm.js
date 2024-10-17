import { View } from "react-native";
import { Button, Input } from "@rneui/base";
import { styles } from "./ChangeDisplayNameForm.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data";
import { updateProfile } from "firebase/auth";
import { getAuth } from "../../../utils";
import Toast from "react-native-toast-message";

export function ChangeDisplayNameForm(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema,
    onSubmit: async values => {
      try {
        const { displayName } = values;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });

        onReload();
        onClose();
      } catch (e) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error updating displayName",
          text2: e.message,
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder={"Names"}
        onChangeText={value => formik.setFieldValue("displayName", value)}
        errorMessage={formik.errors.displayName}
        rightIcon={{ type: "material-community", name: "account-circle-outline", color: "#c2c2c2" }}
      />
      <Button
        title="Save data"
        onPress={() => formik.handleSubmit()}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
