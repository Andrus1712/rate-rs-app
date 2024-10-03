import { View } from "react-native";
import { styles } from "./ChangeEmailForm.styles";
import { Button, Input } from "@rneui/base";
import { useFormik } from "formik";

import { getAuth } from "../../../utils";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import { useState } from "react";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema,
    onSubmit: async values => {
      try {
        const { email, password } = values;
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(currentUser.email, password);
        await reauthenticateWithCredential(currentUser, credentials);
        await updateEmail(currentUser, email);

        onReload();
        onClose();
      } catch (e) {
        console.log(e);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error updating Email",
          text2: e.message,
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder={"Change Email"}
        onChangeText={value => formik.setFieldValue("email", value)}
        errorMessage={formik.errors.email}
        rightIcon={{ type: "material-community", name: "account-circle-outline", color: "#c2c2c2" }}
      />
      <Input
        placeholder={"Password"}
        secureTextEntry={!showPassword}
        onChangeText={value => formik.setFieldValue("password", value)}
        errorMessage={formik.errors.password}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(prev => !prev),
        }}
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
