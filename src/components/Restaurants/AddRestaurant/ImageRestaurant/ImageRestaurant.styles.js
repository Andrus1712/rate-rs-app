import { Dimensions, StyleSheet } from "react-native";

const buildScreenWidth = Dimensions.get("screen");
export const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: buildScreenWidth.width,
  },
});
