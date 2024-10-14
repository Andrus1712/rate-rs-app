import React, { useState } from "react";
import { Text, View } from "react-native";
import { Avatar } from "@rneui/base";
import { styles } from "./InfoUser.styles";
import { getAuth, storage } from "../../../utils";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, email, displayName, photoURL } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      multiple: false,
    });

    if (!result.canceled) {
      result.assets.map(async img => {
        await uploadImage(img.uri);
      });
    }
  };

  const uploadImage = async uri => {
    setLoading(true);
    setLoadingText("Uploading image...");
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `Avatar/${uid}`);

    uploadBytes(storageRef, blob).then(snapshot => {
      finishUpload(snapshot.metadata.fullPath);
    });
  };

  const finishUpload = async path => {
    setLoading(false);
    const storage = getStorage();
    const imageRef = ref(storage, path);
    const imgURL = await getDownloadURL(imageRef);

    const auth = getAuth().currentUser;
    await updateProfile(auth, {
      photoURL: imgURL,
    });
    setAvatar(imgURL);
  };

  return (
    <View style={styles.container}>
      <Avatar
        size={"large"}
        rounded
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: avatar }}>
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonymous"}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}
