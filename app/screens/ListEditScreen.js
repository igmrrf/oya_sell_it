import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import AppFormPicker from "../components/forms/AppFormPicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Clothing", value: 2, backgroundColor: "blue", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "green", icon: "lock" },
];

function ListEditScreen(props) {
  const location = useLocation();
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setVisibleUpload(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setUploadProgress(progress)
    );
    setVisibleUpload(false);
    setUploadProgress(0);

    if (!result.ok) {
      setUploadProgress(false);
      return alert("could not save the listing");
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setVisibleUpload(false)}
        progress={uploadProgress}
        visible={visibleUpload}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: "",
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder={"Title"} />
        <AppFormField
          keyBoardType="numberic"
          maxLength={8}
          name={"price"}
          placeholder={"Price"}
          width={120}
        />
        <AppFormPicker
          items={categories}
          numberOfColumns={categories.length}
          name="category"
          placeholder="Category"
          width={"50%"}
          PickerItemComponent={CategoryPickerItem}
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ListEditScreen;
