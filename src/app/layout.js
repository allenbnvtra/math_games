import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import AuthProvider from "./AuthProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Mathemathink",
  description:
    "Mathemathink - the website where you can learn math while playing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={montserrat.className}>
          <div>
            <NavBar />
            {children}
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
