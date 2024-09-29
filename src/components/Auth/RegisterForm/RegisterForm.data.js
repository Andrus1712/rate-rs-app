import * as Yup from 'yup';

export function initialValues() {
    return {
        email: "",
        password: "",
        confirmPassword: "",
    }
}


export function validationSchema() {
    return Yup.object({
        email: Yup
            .string()
            .email("Invalid Email")
            .required("Email is required"),
        password: Yup
            .string()
            .required("Password is required"),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("confirmPassword is required"),
    }).shape({})
}
