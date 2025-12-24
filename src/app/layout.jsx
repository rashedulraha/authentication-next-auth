import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/Provider/NextAuthSessionProvider/NextAuthSessionProvider";
const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <NextAuthSessionProvider>
      <html className={`${poppins.className}`}>
        <body className="">{children}</body>
      </html>
    </NextAuthSessionProvider>
  );
};
export default RootLayout;
