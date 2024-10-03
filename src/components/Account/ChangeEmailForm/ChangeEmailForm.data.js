import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email().required("Email name is required"),
    password: Yup.string().required("Password name is required"),
  }).shape({});
}
