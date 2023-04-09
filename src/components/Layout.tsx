import Header from "./Header";
import { Roboto_Serif } from "next/font/google";

const roboto = Roboto_Serif({
  subsets: ["latin"],
});

const Layout = ({ children }: any) => {
  return (
    <main className={roboto.className}>
      <Header />
      <div>{children}</div>
    </main>
  );
};
export default Layout;
