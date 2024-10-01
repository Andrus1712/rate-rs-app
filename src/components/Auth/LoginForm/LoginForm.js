import React, { useState } from "react";
import { View } from "react-native";
import { Button, Icon, Input } from "@rneui/base";
import { styles } from "./Loginform.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.data";
import Toast from "react-native-toast-message";
import { getAuth, screen } from "../../../utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function LoginForm() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema(),
    onSubmit: async values => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigation.navigate(screen.account.index);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al iniciar sesión",
          text2: error.message,
        });
        console.log(error);
      }
    },
    validateOnChange: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.content}>
      <Input
        placeholder={"Email"}
        style={styles.input}
        onChangeText={value => formik.setFieldValue("email", value)}
        errorMessage={formik.errors.email}
        rightIcon={<Icon type={"material-community"} style={styles.icon} name={"email"} />}
      />
      <Input
        placeholder={"Password"}
        style={styles.input}
        secureTextEntry={showPassword}
        onChangeText={value => formik.setFieldValue("password", value)}
        errorMessage={formik.errors.password}
        rightIcon={
          <Icon
            type={"material-community"}
            style={styles.icon}
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title={"Ingresar"}
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
