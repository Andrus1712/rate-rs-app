import { View } from "react-native";
import { db, getAuth } from "../../../utils";
import { AccountOptions, InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { Button } from "@rneui/base";
import { signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

export const UserLoggedScreen = () => {
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  useEffect(() => {
    const updateUser = async () => {
      const user = getAuth().currentUser;
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });
    };
    updateUser().catch(e => {
      console.log(e);
    });
  }, [reload]);

  const onReload = () => {
    setReload(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <InfoUser onReload={onReload} setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload} />
      <Button
        title={"Close session"}
        buttonStyle={styles.btn}
        titleStyle={styles.title}
        onPress={() => logout()}
      />

      <LoadingModal show={loading} text={loadingText} progress={0} />
    </View>
  );
};
