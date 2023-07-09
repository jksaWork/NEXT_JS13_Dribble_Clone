"use client";
import { Formik, Field, Form } from "formik";
import CustomFiled from "./CustomFiled";
import { CreateProjectSchema } from "@/lib/validator";
import { useRef, useState } from "react";
import {
  fetchUserToken,
  CreateProjectAction,
  EditProjectAction,
} from "@/lib/actions";
import ReactFileUploader from "./ReactFileUploader";
import { getServerComponents } from "@/lib/session";
import { SessionInterface, ProjectInterface } from "@/common.types";
import { useRouter, redirect } from "next/navigation";
type ProjectFormProps = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};
function ProjectForm({
  type,
  session,
  project,
}: // SubmitFun,
ProjectFormProps) {
  // const ref = useRef();
  const [Files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  // Create Form For Your Project

  const SubmitFun = async (values: any) => {
    try {
      setLoading(true);
      values.image = Files;
      const token = await fetchUserToken();
      // console.log("Before Create Project Mutaion");
      let res;
      if (type == "create") {
        res = await CreateProjectAction(values, session.user?.id, token);
      } else {
        res = await EditProjectAction(values, values.id, token);
      }
      // @ts-ignore
      // const data = await res.json();
      console.log(token, res, "Token");
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const SubmitFun = () => {};
  const form = {
    title: project?.title || "",
    id: project?.id || "",
    description: project?.description || "",
    image: project?.image || "",
    livesite: project?.livesite || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  };

  return (
    <div className="w-full overflow-hidden">
      <Formik
        initialValues={form}
        validationSchema={CreateProjectSchema}
        onSubmit={SubmitFun}
      >
        {({ errors, touched }) => (
          <Form className="px-3">
            <div className="grid mx-3 sm:grid-cols-2 max-w-full overflow-hidden gap-2">
              <Field
                name="title"
                component={CustomFiled}
                className="form_field-input"
              />
              <Field
                name="description"
                component={CustomFiled}
                className="form_field-input"
              />

              <Field
                name="livesite"
                title="live site Url"
                component={CustomFiled}
                type="text"
                className="form_field-input"
              />
              <Field
                name="githubUrl"
                title="github Url"
                component={CustomFiled}
                type="text"
                className="form_field-input"
              />
              <Field
                title="Category"
                name="category"
                component={CustomFiled}
                type="text"
                className="form_field-input"
              />
            </div>
            <div className="m-3">
              <ReactFileUploader Files={Files} setFiles={setFiles} />
            </div>

            <br />
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                className="text-blue-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>

              <button
                className="bg-blue-500  text-white rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                {!loading ? type : `${type} ...`}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default ProjectForm;
