import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { userName: "rashedul", password: "1234" },
  { userName: "islam", password: "5678" },
  { userName: "abdullah", password: "9101" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with name button
      name: "Sign in with email and password",

      //  form inputs

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        Secret: {
          label: "Secret",
          type: "number",
          placeholder: "Enter your secret code",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        //  my own login logic
        const user = userList?.find((u) => u.userName === username);
        if (!user) return null;

        const isPasswordOk = user.password === password;
        if (isPasswordOk) return user;

        return null;
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
