import { useEffect, useRef, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import HomeIcon from "./../assets/icons/home.svg";
import MyEventIcon from "./../assets/icons/my-event.svg";
import MyBookings from "./../assets/icons/my-booking.svg";
import CoordinatorIcon from "./../assets/icons/coordinator.svg";
import LogoutIcon from "./../assets/icons/logout.svg";
import LoginIcon from "./../assets/icons/login.svg";

// Components
import { BaseIcon } from "./Icon";

// Store
import useAuthStore from "../Store/useAuthStore";
import { useUIStore } from "../Store/useUIStore";

interface SidebarProps {
  menuButtonRef: React.RefObject<HTMLImageElement | null>; // 👈 MenuIcon ref from Header
}

interface NavItem {
  name: string;
  link: string;
  icon: string;
}

const Sidebar = memo(({ menuButtonRef }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, closeSidebar } = useUIStore();

  const sidebarRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/",
      icon: HomeIcon,
    },
    {
      name: "My Events",
      link: "/myevents",
      icon: MyEventIcon,
    },
    {
      name: "Create Events",
      link: "/events/create",
      icon: "https://img.icons8.com/sf-black/64/calendar-plus.png",
    },
    {
      name: "My Bokings",
      link: "/mybookings",
      icon: MyBookings,
    },
    {
      name: "Coordinators",
      link: "/coordinators",
      icon: CoordinatorIcon,
    },
  ];

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node) // ignore MenuIcon
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, closeSidebar, menuButtonRef]);

  // 👇 Close sidebar when pathname changes
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <motion.aside
      ref={sidebarRef}
      variants={{
        // initial: {
        //   width: "var(--sidebar-width)",
        // },
        animate: {
          width: sidebarOpen ? "var(--sidebar-width)" : 0,
        },
      }}
      initial={false}
      animate="animate"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="bg-secondary overflow-hidden z-40 absolute sm:relative sm:flex-shrink-0"
      style={{
        height: "calc(100svh - var(--menu-height))",
        // position: "sticky",
        // top: "var(-  -menu-height)",
      }}
    >
      <nav className="flex flex-col w-sidebar-width">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`${
              pathname === item.link
                ? "bg-accent/15 scale-105"
                : "bg-transparent hover:bg-accent/5"
            } cursor-pointer flex flex-row items-center gap-x-4 px-4 py-3 transition-all duration-300`}
          >
            <span>
              <BaseIcon
                src={item.icon}
                alt={item.name}
                className={`${
                  pathname === item.link ? "!invert-0" : "!invert-50"
                } transition-all duration-300`}
              />
            </span>

            <span
              className={`${
                pathname === item.link ? "text-white" : "text-white/50"
              } transition-all duration-300 whitespace-nowrap`}
            >
              {item.name}
            </span>
          </Link>
        ))}

        {/* Log Out */}
        {user && (
          <div
            onClick={logout}
            className="cursor-pointer px-4 py-3 flex flex-row items-center gap-x-4"
          >
            <span>
              <BaseIcon src={LogoutIcon} alt="Logout" className="" />
            </span>
            <span className="text-white/75">Log out</span>
          </div>
        )}

        {/* Log In */}
        {!user && (
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer px-4 py-3 flex flex-row items-center gap-x-4"
          >
            <span>
              <BaseIcon src={LoginIcon} alt="Logout" className="" />
            </span>
            <span className="text-white/75">Log in</span>
          </div>
        )}
      </nav>
    </motion.aside>
  );
});

export default Sidebar;
