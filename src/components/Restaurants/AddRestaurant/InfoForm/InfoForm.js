import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "@rneui/base";
import { MapForm } from "../MapForm";
import { useState } from "react";

export function InfoForm(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => {
    setShowMap(prevShowMap => !prevShowMap);
  };

  return (
    <>
      <View style={styles.container}>
        <Input
          label={"Restaurant name"}
          onChangeText={value => formik.setFieldValue("name", value)}
          errorMessage={formik.errors.name}
        />
        <Input
          label={"Address"}
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            size: 35,
            color: getColorIconMap(formik),
            onPress: () => onOpenCloseMap(),
          }}
          onChangeText={value => formik.setFieldValue("address", value)}
          errorMessage={formik.errors.address}
        />
        <Input
          label={"Email"}
          onChangeText={value => formik.setFieldValue("email", value)}
          errorMessage={formik.errors.email}
        />
        <Input
          label={"Phone"}
          onChangeText={value => formik.setFieldValue("phone", value)}
          errorMessage={formik.errors.phone}
        />
        <Input
          label={"Description"}
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={value => formik.setFieldValue("description", value)}
          errorMessage={formik.errors.description}
        />
      </View>

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = formik => {
  if (formik.errors.location) return "#ff0000";
  if (formik.values.location) return "#00a680";
};
