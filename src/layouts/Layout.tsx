import Header from "../components/Header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const Layout = ({ children }: any) => {
  return (
    <main className={inter.className}>
      <Header />
      <div>{children}</div>
    </main>
  );
};
export default Layout;
