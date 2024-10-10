import { Alert, ScrollView, Text } from "react-native";
import { styles } from "./UploadImageFrom.styles";
import { Avatar, Icon } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { storage } from "../../../../utils";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";

export function UploadImageForm(props) {
  const { formik, setLoading, setLoadingText, setProgress } = props;

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await uploadImage(uri);
    }
  };

  const uploadImage = async uri => {
    setLoading(true);
    setLoadingText("Uploading image...");

    const response = await fetch(uri);
    const blob = await response.blob();

    // Genera un identificador único para cada imagen
    const storageRef = ref(storage, `Restaurants/${uuid.v4()}`);

    // Subir la imagen a Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, blob);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        setProgress(progress);
      },
      error => {
        setLoading(false);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setLoading(false);
          console.log("File available at", downloadURL);
          //perform your task
          updatePhotosRestaurant(downloadURL);
        });
      }
    );
  };

  const updatePhotosRestaurant = downloadURL => {
    formik.setFieldValue("images", [...formik.values.images, downloadURL]);
  };

  const removeImage = image => {
    Alert.alert(
      "Delete image",
      "Are you sure you want to delete?",
      [
        {
          title: "Cancel",
          text: "Cancel",
        },
        {
          title: "Confirm",
          text: "Confirm",
          onPress: () => {
            const storageRef = ref(storage, image);
            deleteObject(storageRef)
              .then(() => {
                const result = formik.values.images.filter(img => img !== image);
                formik.setFieldValue("images", result);
                Toast.show({
                  text1: "File deleted successfully",
                  type: "success",
                  position: "bottom",
                });
              })
              .catch(error => {
                Toast.show({
                  text1: "Uh-oh, an error occurred!",
                  text2: error.message,
                  type: "error",
                  position: "bottom",
                });
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal={true} showsVerticalScrollIndicator={false}>
        <Icon
          name={"camera"}
          type={"material-community"}
          color={"#a7a7a7"}
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {formik.values.images &&
          formik.values.images.map(image => {
            return (
              <Avatar
                key={image}
                source={{
                  uri: image,
                }}
                containerStyle={styles.imageStyles}
                onPress={() => removeImage(image)}
              />
            );
          })}
      </ScrollView>
      <Text style={styles.titleError}>{formik.errors.images}</Text>
    </>
  );
}
