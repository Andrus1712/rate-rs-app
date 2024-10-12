import { Text, View } from "react-native";

export function RestaurantScreen(props) {
  const { route } = props;
  console.log(route);
  return (
    <View>
      <Text>{JSON.stringify(route.params)}</Text>
    </View>
  );
}
