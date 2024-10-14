import { Image } from "@rneui/base";
import { View } from "react-native";
import { styles } from "./ImageRestaurant.styles";

export function ImageRestaurant(props) {
  const { formik } = props;
  const primaryImage = formik.values.images[0];
  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/image-not-found.png")
        }
        style={styles.image}
      />
    </View>
  );
}
