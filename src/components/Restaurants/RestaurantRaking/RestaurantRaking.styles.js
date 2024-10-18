import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  descriptionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
  },
  titleName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleNameRating: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 12,
    color: "#828282",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  medal: {
    marginRight: 5,
  },
});
