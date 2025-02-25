import "./globals.css";
import { poppins } from "@/lib/fonts";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Progress from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "app",
  description: "app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Progress />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
