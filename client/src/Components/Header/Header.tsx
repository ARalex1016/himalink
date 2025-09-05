// Icons
import searchIcon from "./../../assets/icons/search.svg";

const Header = () => {
  return (
    <header className="w-screen h-menu-height bg-secondary flex flex-row items-center">
      <h2 className="w-sidebar-width flex-shrink-0 text-xl font-medium text-accent/75 px-4">
        HimaLink
      </h2>

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
        <div className="w-7 h-7 rounded-full bg-gray-500"></div>
      </div>
    </header>
  );
};

export default Header;
