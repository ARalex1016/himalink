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
    <div className="w-screen h-[100svh] bg-primary overflow-hidden flex flex-col">
      <Header menuButtonRef={menuButtonRef} />

      <div className="flex flex-1 relative h-[calc(100svh-var(--menu-height))]">
        <Sidebar menuButtonRef={menuButtonRef} />

        <main
          className={`flex-1 overflow-y-auto px-side-spacing py-2 ${className}`}
          style={{
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
