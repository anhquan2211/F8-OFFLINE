import { notFound } from "next/navigation";
import { useLocale, NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Theme from "@/components/Theme";
import ThemeContextProvider from "@/context/theme-context";
import LanguageSelect from "@/components/Language";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anh Quan | Personal Portfolio",
  description: "Anh Quan Portfolio",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string; // Assuming 'locale' is a string, adjust the type accordingly if it's different
    // Add other properties if 'params' contains more than just 'locale'
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="!scroll-smooth">
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
