import * as Yup from "yup";

export function initialValues() {
  return {
    newPassword: "",
    confirmNewPassword: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    newPassword: Yup.string().required("newPassword is required"),
    confirmNewPassword: Yup.string()
      .required("confirmNewPassword is required")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    password: Yup.string().required("Password is required"),
  });
}
