import * as Yup from "yup";

export const CreateProjectSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required(),
  githubUrl: Yup.string().url().min(2, "Too Short!").required(),
  livesite: Yup.string().url().min(2, "Too Short!").required(),
  // githubUrl: Yup.string().url().min(2, "Too Short!").required("Required"),
});
