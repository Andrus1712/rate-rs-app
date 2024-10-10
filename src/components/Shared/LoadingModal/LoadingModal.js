import { ActivityIndicator, View } from "react-native";
import { LinearProgress, Overlay, Text } from "@rneui/base";
import { styles } from "./LoadingModal.styles";

export const LoadingModal = props => {
  const { show, text, progress } = props;

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size={"large"} color={"#00a680"} />
        {text && <Text style={styles.text}>{text}</Text>}
        {progress !== 0 ? <LinearProgress value={progress} animating={{ duration: 1000 }} /> : null}
      </View>
    </Overlay>
  );
};

LoadingModal.defaultProps = {
  show: false,
};
