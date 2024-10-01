import { View } from "react-native";
import { Image } from "@rneui/base";
import { styles } from "../ResgisterScreen";
import { RegisterForm } from "../../../components/Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
