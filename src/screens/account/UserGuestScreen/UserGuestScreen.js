import { ScrollView } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import { Button, Image, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const UserGuestScreen = () => {
  const { navigate } = useNavigation();

  const goToLogin = () => {
    navigate(screen.account.tab, { screen: screen.account.login });
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image} />
      <Text style={styles.title}>Ingresa a tu cuenta</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una
        forma sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.
      </Text>

      <Button title={"Ver tu perfil"} onPress={goToLogin} buttonStyle={styles.btnStyles}></Button>
    </ScrollView>
  );
};
