import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import { ErrorMessage } from ".";

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        items={items}
        numberOfColums={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        name={name}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
