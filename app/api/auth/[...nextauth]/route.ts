import { AuthOption } from "@/lib/session";
import NextAuth from "next-auth";
const handler = NextAuth(AuthOption);
export { handler as GET, handler as POST };
