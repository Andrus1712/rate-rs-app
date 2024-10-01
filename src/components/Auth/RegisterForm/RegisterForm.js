import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./RegisterForm.styles";
import { Input } from "@rneui/themed";
import { Button, Icon } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { getAuth, screen } from "../../../utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export function RegisterForm(props) {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async values => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, values.email, values.password);

        navigation.navigate(screen.account.index);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse",
          text2: error.message,
        });
        console.log(error);
      }
    },
    validateOnChange: false,
  });
  return (
    <View style={styles.container}>
      <Input
        secureTextEntry={false}
        placeholder={"Email"}
        style={styles.input}
        onChangeText={value => formik.setFieldValue("email", value)}
        errorMessage={formik.errors.email}
        rightIcon={<Icon type={"material-community"} style={styles.icon} name={"at"} />}
      />

      <Input
        secureTextEntry={!showPassword}
        placeholder={"Password"}
        style={styles.input}
        onChangeText={value => formik.setFieldValue("password", value)}
        errorMessage={formik.errors.password}
        rightIcon={
          <Icon
            onPress={() => setShowPassword(!showPassword)}
            type={"material-community"}
            style={styles.icon}
            name={showPassword ? "eye-off-outline" : "eye-outline"}
          />
        }
      />

      <Input
        secureTextEntry={!showConfirmPassword}
        placeholder={"Confirm Password"}
        style={styles.input}
        onChangeText={value => formik.setFieldValue("confirmPassword", value)}
        errorMessage={formik.errors.confirmPassword}
        rightIcon={
          <Icon
            onPress={() => setConfirmPassword(!showConfirmPassword)}
            type={"material-community"}
            style={styles.icon}
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
          />
        }
      />

      <Button
        title={"Unirse"}
        onPress={() => formik.handleSubmit()}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.btn}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
