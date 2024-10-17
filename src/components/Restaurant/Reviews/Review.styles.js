import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  reviewsContainer: {
    paddingVertical: 15,
  },
  title: {
    fontWeight: "bold",
  },
  subTitle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  comment: {
    paddingRight: 50,
  },
  contentRatingDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  starRating: {
    height: 10,
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  dateContent: {
    fontSize: 12,
    color: "#828282",
  }
});
