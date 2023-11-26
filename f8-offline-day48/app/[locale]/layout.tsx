import { notFound } from "next/navigation";
import { useLocale, NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Theme from "@/components/Theme";
import LanguageSelect from "@/components/Language";
import NotFound from "@/components/NotFound";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata object containing title and description for the webpage
export const metadata = {
  title: "Anh Quan | Personal Portfolio",
  description: "Anh Quan Portfolio",
};

// Interface defining props for LocaleLayout component
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Getting the current locale using useLocale() from next-intl

  // Checking if the provided locale parameter doesn't match the current locale

  let messages;
  let localeGlobal;
  try {
    const locale = useLocale();
    localeGlobal = locale;
    // Dynamically importing messages based on the locale
    messages = (await import(`../../messages/${locale}.json`)).default;

    if (params.locale !== locale) {
      return <NotFound />;
    }
  } catch (error) {
    return <NotFound />;
  }

  return (
    <html lang={localeGlobal} className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fff] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#fff] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Footer />
              <Theme />
              <LanguageSelect />
              <Toaster position="top-right" />
            </NextIntlClientProvider>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
