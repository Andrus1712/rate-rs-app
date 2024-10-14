import { ActivityIndicator, View } from "react-native";
import { Text } from "@rneui/base";
import { styles } from "./Loading.styles";

export function Loading(props) {
  const { show, text } = props;

  if (!show) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#00a680"} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
