import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Hooks
import UseToggle from "../../Hooks/useToggle";

// Icons
import MenuIcon from "./../../assets/icons/menu.svg";
import SearchIcon from "./../../assets/icons/search.svg";
import AvatarIcon from "./../../assets/icons/avatar.svg";
import LogoutIcon from "./../../assets/icons/logout.svg";
import LoginIcon from "./../../assets/icons/login.svg";

// Components
import { BaseIcon } from "../Icon";

// Store
import useAuthStore from "../../Store/useAuthStore";
import { useUIStore } from "../../Store/useUIStore";

interface HeaderProps {
  menuButtonRef: React.RefObject<HTMLImageElement | null>; // 👈 MenuIcon ref from Header
  className?: string;
}

interface DropDownNavProps {
  isNavOpen: Boolean;
  profileButtonRef: React.RefObject<HTMLDivElement | null>; // Profile icon ref
  closeNav: () => void; // function to close dropdown
}

const DropDownNav = ({
  isNavOpen,
  profileButtonRef,
  closeNav,
}: DropDownNavProps) => {
  const navigate = useNavigate();

  const dropDownNavRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuthStore();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNavOpen &&
        dropDownNavRef.current &&
        !dropDownNavRef.current.contains(event.target as Node) &&
        !profileButtonRef.current?.contains(event.target as Node) // ignore profile icon
      ) {
        closeNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavOpen, profileButtonRef, closeNav]);

  return (
    <AnimatePresence>
      {isNavOpen && (
        <motion.div
          ref={dropDownNavRef}
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
          className="w-3/5 xs:w-64 text-white/80 bg-secondary rounded-lg absolute z-50 top-full right-side-spacing shadow-sm shadow-white/70 flex flex-col overflow-hidden"
        >
          {user && (
            <div className="flex flex-col py-4 px-side-spacing">
              <span className="text-lg font-medium">{user.displayName}</span>

              <span className="leading-2 text-sm">{user.email}</span>
            </div>
          )}

          <div className="px-side-spacing border-y-[1px] border-white/40">
            <p className="py-1">Profile</p>

            <p className="py-1">My Bookings</p>
          </div>

          {/* Log Out */}
          {user && (
            <div
              onClick={logout}
              className="px-side-spacing py-3 flex flex-row gap-x-4 items-center cursor-pointer"
            >
              <BaseIcon src={LogoutIcon} alt="Logout Icon" />

              <p>Log out</p>
            </div>
          )}

          {/* Log In */}
          {!user && (
            <div
              onClick={() => navigate("/login")}
              className="px-side-spacing py-3 flex flex-row gap-x-4 items-center cursor-pointer"
            >
              <BaseIcon src={LoginIcon} alt="Login Icon" />

              <p>Log in</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ menuButtonRef, className }: HeaderProps) => {
  const { user } = useAuthStore();

  const profileButtonRef = useRef<HTMLDivElement>(null);

  const { toggleSidebar } = useUIStore();

  const { state: isNavOpen, toggle, close: closeNav } = UseToggle(false);

  return (
    <header
      className={`w-screen h-menu-height bg-secondary flex flex-row items-center sticky top-0 left-0 z-50 ${className}`}
    >
      {/* Logo */}
      <div className="h-full xs:w-sidebar-width flex-shrink-0 flex flex-row items-center gap-x-3 xs:gap-x-4 pl-side-spacing">
        <BaseIcon
          ref={menuButtonRef}
          src={MenuIcon}
          alt="Menu Icon"
          onClick={toggleSidebar}
        />

        <h2 className="text-lg xs:text-xl font-medium text-accent/75">
          HimaLink
        </h2>
      </div>

      <div className="w-full h-full flex flex-row justify-between items-center px-side-spacing">
        {/* Search bar */}
        <div className="h-3/5 bg-gray rounded-lg flex flex-row relative">
          <BaseIcon
            src={SearchIcon}
            alt="Search"
            className="absolute left-2 top-1/2 !size-4 !xs:size-4 -translate-y-1/2"
          />

          <input
            type="text"
            placeholder="Search events..."
            className="w-40 text-white/75 text-sm xs:text-base rounded-inherit outline-none pl-8 transition-all duration-200 border-[1px] border-transparent focus:border-accent focus:w-44 xs:focus:w-96"
          />
        </div>

        {/* Profile */}
        <div
          ref={profileButtonRef}
          onClick={toggle}
          className={`size-8 rounded-full bg-transparent cursor-pointer overflow-hidden grid place-items-center hover:bg-gray hover:scale-110 transition-all duration-300 relative ${
            isNavOpen
              ? "outline-[1px] outline-accent/50 scale-110"
              : "outline-none"
          }`}
        >
          {user?.photoURL ? (
            <BaseIcon
              src={user?.photoURL}
              alt="Profile"
              className="!invert-0 size-full"
            />
          ) : (
            <BaseIcon src={AvatarIcon} alt="Avatar" className="invert-25" />
          )}
        </div>
      </div>

      {/* Dropdown menu */}
      <DropDownNav
        isNavOpen={isNavOpen}
        profileButtonRef={profileButtonRef}
        closeNav={closeNav}
      />
    </header>
  );
};

export default Header;
