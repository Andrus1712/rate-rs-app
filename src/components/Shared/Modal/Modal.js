import { Overlay } from "@rneui/base";
import { styles } from "./Modal.styles";

export function Modal(props) {
  const { close, show, children } = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
      {children}
    </Overlay>
  );
}
