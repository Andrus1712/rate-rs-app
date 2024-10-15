import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    comment: "",
    rating: "",
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("Title is required"),
    comment: Yup.string().required("Comment is required"),
    rating: Yup.number().required("Rating is required"),
  }).shape({});
}
