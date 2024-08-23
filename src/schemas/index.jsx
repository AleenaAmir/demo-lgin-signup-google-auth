import * as Yup from "yup";

export const SignUpSchemas = Yup.object({
  name: Yup.string().min(3).max(20).required("enter a valid name please"),

  email: Yup.string().email().required("enter valid email address"),
  password: Yup.string().min(6).required("enter a valid password"),
});
