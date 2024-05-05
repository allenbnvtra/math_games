import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/db";
import User from "@/model/user";

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  jwt: {
    maxAge: 30 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const { username, password } = credentials;

          if (!username || !password) return null;

          await dbConnect();

          const loginUser = await User.findOne({ username }).select(
            "+password"
          );

          if (!loginUser) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            loginUser.password
          );

          if (!passwordMatch) {
            return null;
          }

          const user = {
            name: loginUser.name,
            username: loginUser.username,
            role: loginUser.role,
            score: loginUser.score,
          };
          return user;
        } catch (error) {
          console.error("Error fetching loginUser data:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.role = params.user.role;
        params.token.username = params.user.username;
        params.token.id = params.sub;
        params.user.password = undefined;
      }
      return params.token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.password = undefined;
      }

      return session;
    },
  },
};

export default options;
