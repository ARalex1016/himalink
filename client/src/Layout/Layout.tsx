import { motion } from "framer-motion";

// Components
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

// Hook
import UseToggle from "../Hooks/useToggle";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { state: isSideBarOpen, toggle: toggleSideBar } = UseToggle(true);

  return (
    <div className="w-screen h-screen bg-primary flex flex-col ">
      <Header toggleSideBar={toggleSideBar} />

      <div className="flex flex-row flex-1">
        <motion.aside
          variants={{
            initial: {
              width: "var(--sidebar-width)",
            },
            animate: {
              width: isSideBarOpen ? "var(--sidebar-width)" : 0,
            },
          }}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="bg-secondary overflow-hidden absolute sm:relative z-50"
          style={{
            height: "calc(100svh - var(--menu-height))",
          }}
        >
          <div className="w-sidebar-width">
            <Sidebar />
          </div>
        </motion.aside>

        <div className="flex-1 px-side-spacing">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
