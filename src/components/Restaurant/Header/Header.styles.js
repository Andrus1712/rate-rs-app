import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    width: 20,
  },
  description: {
    paddingTop: 10,
    color: "#828282",
  },
  divider: {
    marginTop: 10,
  },
});
