import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((uris) => uris !== uri)
    );
  };

  return (
    <View>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default FormImagePicker;
