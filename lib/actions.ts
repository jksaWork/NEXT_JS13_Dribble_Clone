import { getuserquery, createuserMutation } from "@/graphql";
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
