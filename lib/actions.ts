import { ProjectForm } from "@/common.types";
import {
  getuserquery,
  createProjectMutation,
  createuserMutation,
  fetchprojectquery,
  fetchprojectDetailsquery,
  fetchprofileData,
  deleteProjectMutation,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);
const MakeGraphQLClientRequest = async (query: string, varibale = {}) => {
  try {
    // Make Client Request
    client.setHeader("x-api-key", apiKey);
    return await client.request(query, varibale);
  } catch (err) {
    throw err;
  }
};

export const getUserByEmail = async (email: string) => {
  console.log(email);
  return await MakeGraphQLClientRequest(getuserquery(), { email });
};

export const createUser = async (
  email: string,
  name: string,
  avatar: string
) => {
  const varibale = {
    input: { email, name, avatarUrl: avatar },
  };
  return await MakeGraphQLClientRequest(createuserMutation(), varibale);
};

export const fetchUserToken = async () => {
  const res = await fetch("/api/auth/token");
  const { token } = await res.json();
  return token;
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`/api/uploads`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const CreateProjectAction = async (
  form: ProjectForm,
  creatorId: any,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  console.log(imageUrl, form);
  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    console.log(imageUrl.url);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return MakeGraphQLClientRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = (category?: string, endcursor?: string) => {
  const variables = {
    category,
    endcursor,
  };
  return MakeGraphQLClientRequest(fetchprojectquery, variables);
};

export const getPorjcetDetails = (id: string) => {
  return MakeGraphQLClientRequest(fetchprojectDetailsquery, { id });
};

export const getUserProjects = (id: string) => {
  return MakeGraphQLClientRequest(fetchprofileData, { id });
};

export const deleteProject = (id: string) => {
  return MakeGraphQLClientRequest(deleteProjectMutation, { id });
};

export const EditProjectAction = async (
  form: ProjectForm,
  projectId: any,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form, id: projectId };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);
  const { title, description, image } = updatedForm;
  console.log(image);
  const variables = {
    id: projectId,
    input: { title, description, image },
  };

  return MakeGraphQLClientRequest(updateProjectMutation, variables);
};
