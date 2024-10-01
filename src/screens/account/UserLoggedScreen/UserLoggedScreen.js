import { View } from "react-native";
import { getAuth } from "../../../utils";
import { AccountOptions, InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { Button } from "@rneui/base";
import { signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";
import { useState } from "react";

export const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <View style={styles.container}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions />
      <Button
        title={"Close session"}
        buttonStyle={styles.btn}
        titleStyle={styles.title}
        onPress={() => logout()}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
};
