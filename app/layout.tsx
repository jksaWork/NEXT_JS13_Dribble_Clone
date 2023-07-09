import { Navbar, Footer, Provider, Categories } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dribble Clone Application",
  description: "Dribble Clone Application With All Fetures And Capalits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        {" "}
        <body className={inter.className}>
          <Navbar />
          <Categories />

          <main>
            {children}
            {/*  */}
          </main>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
