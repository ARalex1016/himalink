import { motion, AnimatePresence } from "framer-motion";

// Hooks
import UseToggle from "../../Hooks/useToggle";

// Icons
import menuIcon from "./../../assets/icons/menu.svg";
import searchIcon from "./../../assets/icons/search.svg";
import logoutIcon from "./../../assets/icons/logout.svg";

interface DropDownNavProps {
  isNavOpen: Boolean;
}

interface HeaderProps {
  toggleSideBar: () => void;
}

const DropDownNav = ({ isNavOpen }: DropDownNavProps) => {
  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          variants={{
            initial: {
              opacity: 0,
              height: 0,
            },
            animate: {
              opacity: 1,
              height: "auto",
            },
            exit: {
              opacity: 0,
              height: 0,
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 1,
            ease: "anticipate",
          }}
          className="w-64 text-white/80 bg-secondary rounded-lg absolute z-50 top-full right-side-spacing shadow-sm shadow-white/70 flex flex-col overflow-hidden"
        >
          <div className="flex flex-col py-4 px-side-spacing">
            <span className="text-lg font-medium">User Name</span>

            <span className="leading-2 text-sm">user@gmail.com</span>
          </div>

          <div className="px-side-spacing border-y-[1px] border-white/40">
            <p className="py-1">Profile</p>

            <p className="py-1">My Bookings</p>
          </div>

          <div className="px-side-spacing py-3 flex flex-row gap-x-4 items-center cursor-pointer">
            <p>Log out</p>

            <img
              src={logoutIcon}
              alt="Logout Icon"
              className="w-5 h-5 invert-75"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ toggleSideBar }: HeaderProps) => {
  const { state: isNavOpen, toggle } = UseToggle(false);

  return (
    <header className="w-screen h-menu-height bg-secondary flex flex-row items-center relative">
      {/* Logo */}
      <div className="w-sidebar-width flex-shrink-0 flex flex-row px-side-spacing">
        <img
          onClick={toggleSideBar}
          src={menuIcon}
          alt="Menu Icon"
          className="invert-75"
        />

        <h2 className="text-xl font-medium text-accent/75 px-4">HimaLink</h2>
      </div>

      <div className="w-full h-full flex flex-row justify-between items-center px-side-spacing">
        {/* Search bar */}
        <div className="h-3/5 bg-gray rounded-lg flex flex-row relative">
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-2 top-1/2 w-4 h-4 -translate-y-1/2 invert-75"
          />

          <input
            type="text"
            placeholder="Search events..."
            className="w-full text-white/75 rounded-inherit outline-none pl-8 transition-all duration-200 border-[1px] border-transparent focus:border-accent focus:w-96"
          />
        </div>

        {/* Profile */}
        <div
          onClick={toggle}
          className="w-7 h-7 rounded-full bg-gray-500"
        ></div>
      </div>

      {/* Dropdown menu */}
      <DropDownNav isNavOpen={isNavOpen} />
    </header>
  );
};

export default Header;
