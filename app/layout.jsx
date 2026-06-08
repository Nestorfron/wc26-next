import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "World Cup 2026",
  description:
    "Fixtures, group standings, the knockout bracket, teams and players for the 2026 FIFA World Cup hosted by USA, Canada and Mexico.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} dark bg-background`}
    >
      <body className="antialiased">
        <ThemeProvider>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
