"use client";
import { Formik, Field, Form } from "formik";
import CustomFiled from "./CustomFiled";
import { CreateProjectSchema } from "@/lib/validator";
function ProjectForm({ type }: { type: string }) {
  const project = {
    title: "",
    description: "",
    liveSiteUrl: "",
    image: "",
    githubUrl: "",
    category: "",
  }; // Create Form For Your Project

  const SubmitFun = () => {};
  const form = {
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  };

  return (
    <div>
      <Formik
        initialValues={form}
        validationSchema={CreateProjectSchema}
        onSubmit={SubmitFun}
      >
        {({ errors, touched }) => (
          <Form className="px-3">
            <Field
              name="title"
              component={CustomFiled}
              className="bg-secondary mt-3 mb-2   text-white border-primary-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   
            dark:focus:border-blue-500"
            />

            <Field
              name="creator"
              component={CustomFiled}
              className="bg-secondary mt-3 mb-2 text-white  border-primary-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   
            dark:focus:border-blue-500"
            />

            <Field
              name="message"
              component={CustomFiled}
              type="text"
              className="bg-secondary mt-3 mb-2  border-primary-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   
              dark:focus:border-blue-500"
            />
            <Field
              name="tags"
              component={CustomFiled}
              type="text"
              className="bg-secondary text-white mt-3 mb-2  border-primary-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   
              dark:focus:border-blue-500"
            />

            <br />
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default ProjectForm;
