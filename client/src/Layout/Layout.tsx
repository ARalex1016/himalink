// Components
import type React from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-primary flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-row flex-1">
        <aside className="w-sidebar-width h-full flex gap-x-4 bg-secondary">
          <Sidebar />
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
