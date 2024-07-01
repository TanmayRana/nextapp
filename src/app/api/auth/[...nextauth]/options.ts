import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await dbConnect();
        const findUser = await User.findOne({ email: user.email });

        if (findUser) {
          return true;
        }

        await User.create({ name: user.name, email: user.email });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Next Auth",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
