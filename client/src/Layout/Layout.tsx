import { useRef } from "react";

// Components
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, className }) => {
  const menuButtonRef = useRef<HTMLImageElement>(null);

  return (
    <div className="w-screen h-[100svh] bg-primary flex flex-col overflow-hidden">
      <Header menuButtonRef={menuButtonRef} />

      <div className="flex flex-row flex-1">
        <Sidebar menuButtonRef={menuButtonRef} />

        <div className={`flex-1 px-side-spacing ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
