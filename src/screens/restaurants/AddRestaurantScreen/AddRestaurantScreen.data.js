import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.object().required("Location is required"),
    images: Yup.array().min(1, "One Image is required").max(10, "Image limit 10").required("Image is required"),
  }).shape({});
}
