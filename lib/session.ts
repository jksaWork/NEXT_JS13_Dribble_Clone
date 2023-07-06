import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, getServerSession } from "next-auth";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUserByEmail } from "./actions";

export const AuthOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      try {
        const decodedToken = jsonwebtoken.verify(token!, secret);
        return decodedToken as JWT;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
  callbacks: {
    async session({ session, user, token }) {
      try {
        //    console.log(session.user, user);
        const email = session.user?.email as string;
        const data = (await getUserByEmail(email)) as { user: UserProfile };
        return {
          ...session,
          user: {
            ...session.user,
            ...data.user,
          },
          accessToken: token.accessToken,
        };
      } catch (e) {
        console.log("Error When Retirving Data" + e);
        return session;
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.log(user, "------------");
        // Check IF User Is Exist
        const userExist = (await getUserByEmail(user?.email as string)) as {
          user: UserProfile;
        };
        if (!userExist?.user) {
          await createUser(
            user.email as string,
            user.name as string,
            user.image as string
          );
        }
        // If Not Exist Create It To DB
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
  theme: {
    colorScheme: "dark",
    logo: "/logo.svg",
  },
};

export const getServerComponents = async () => {
  try {
    const session = (await getServerSession(AuthOption)) as SessionInterface;
    return session;
  } catch (error) {
    return null;
  }
};
