import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export const bookSchema = yup.object().shape({
  name: yup.string().required(),
  author: yup.string().required(),
  publisher: yup.string().required(),
  publicationYear: yup.string().required(),
  subject: yup.string().required(),
});