import React from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

interface LayoutProp {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProp) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
