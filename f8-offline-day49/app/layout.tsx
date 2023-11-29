import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ThemeContextProvider from "./components/providers/ThemeContextProvider";
import Theme from "./components/Theme";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking",
  description: "Booking clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${nunito.className} bg-blue-50  dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
          <Theme />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
