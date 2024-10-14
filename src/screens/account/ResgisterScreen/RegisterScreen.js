import { View } from "react-native";
import { Image } from "@rneui/base";
import { RegisterForm } from "../../../components/Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
