import { Link, useLocation } from "react-router-dom";

// Icons
import HomeIcon from "./../assets/icons/home.svg";
import MyEventIcon from "./../assets/icons/my-event.svg";
import MyBookings from "./../assets/icons/my-booking.svg";
import LogoutIcon from "./../assets/icons/logout.svg";

interface NavItem {
  name: string;
  link: string;
  icon: string;
}

const Sidebar = () => {
  const { pathname } = useLocation();

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
  ];

  return (
    <nav className="w-full flex flex-col">
      {navItems.map((item) => (
        <Link
          to={item.link}
          className={`${
            pathname === item.link ? "bg-primary" : "bg-transparent"
          } cursor-pointer flex flex-row items-center gap-x-4 px-4 py-3`}
        >
          <span>
            <img
              src={item.icon}
              alt={item.name}
              className={`${
                pathname === item.link ? "invert-100" : "invert-75"
              } w-6 h-6`}
            />
          </span>

          <span
            className={`${
              pathname === item.link ? "text-white" : "text-white/75"
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}

      <div className="cursor-pointer px-4 py-3 flex flex-row items-center gap-x-4">
        <span>
          <img src={LogoutIcon} alt="Logout" className="invert-75 w-6 h-6" />
        </span>
        <span className="text-white">Log out</span>
      </div>
    </nav>
  );
};

export default Sidebar;
