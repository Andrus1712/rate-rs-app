import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  restaurantList: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  textName: {
    fontWeight: "bold",
  },
  textInfo: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3
  }
});
