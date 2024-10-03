import { View } from "react-native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import Toast from "react-native-toast-message";
import { styles } from "./ChangePasswordForm.styles";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema,
    onSubmit: async values => {
      try {
        const { password, newPassword } = values;
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(currentUser.email, password);

        await reauthenticateWithCredential(currentUser, credentials);
        await updatePassword(currentUser, newPassword);
        onClose();
      } catch (e) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error updating password",
          text2: e.message,
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        label={"Enter new password"}
        // placeholder={"Enter new Password"}
        secureTextEntry={!showPassword}
        onChangeText={value => formik.setFieldValue("newPassword", value)}
        errorMessage={formik.errors.newPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(prev => !prev),
        }}
      />
      <Input
        label={"Confirm new password"}
        // placeholder={"Conform new Password"}
        secureTextEntry={!showPassword}
        onChangeText={value => formik.setFieldValue("confirmNewPassword", value)}
        errorMessage={formik.errors.confirmNewPassword}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(prev => !prev),
        }}
      />

      <Input
        label={"Enter your previous password"}
        // placeholder={"Previous password"}
        secureTextEntry={!showPassword}
        onChangeText={value => formik.setFieldValue("password", value)}
        errorMessage={formik.errors.password}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(prev => !prev),
        }}
        containerStyle={styles.prevPassword}
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
