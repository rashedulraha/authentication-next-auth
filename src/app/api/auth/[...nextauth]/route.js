import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// const userList = [
//   { name: "rashedul", password: "1234" },
//   { name: "islam", password: "5678" },
//   { name: "abdullah", password: "9101" },
// ];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with name button
      name: "Email and password",

      //  form inputs

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your valid password",
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        //  my own login logic
        // const user = userList?.find((u) => u.name == username);

        const user = await dbConnect("users").findOne({ email });
        if (!user) return null;
        console.log("user data:", user);

        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (isPasswordOk) return user;

        return null;
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
