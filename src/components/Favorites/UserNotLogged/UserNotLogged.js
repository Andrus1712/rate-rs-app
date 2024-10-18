import { View } from "react-native";
import { Button, Icon, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./UserNotLogged.styles";

export function UserNotLogged(props) {
  const navigation = useNavigation();

  const goLogin = async () => {
    navigation.navigate(screen.account.tab, {
      animated: true,
      screen: screen.account.login,
    });
  };
  return (
    <View style={styles.container}>
      <Icon
        name={"alert-outline"}
        type={"material-community"}
        size={80}
        onPress={() => goLogin()}
      />
      <Text style={styles.text}>You need logged to view favorites</Text>
      <Button
        title={"Go login"}
        onPress={() => goLogin()}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
}
