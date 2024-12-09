import React, { useContext } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegUserCircle } from "react-icons/fa";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logOut } = useContext(AuthContext);

  const signOutUser = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  const userLists = (
    <>
      <li className="my-1 text-left ml-3 text-blue-400" disabled>
        {user?.displayName}
      </li>
      <li>
        <Link to={"/dashboard/profile"}>Dashboard</Link>
      </li>
      <li>
        <button onClick={signOutUser}>Log Out</button>
      </li>
    </>
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={"/"} className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={"/meals"} className="flex items-center">
          Meals
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={"/upcomingMeals"} className="flex items-center">
          Upcoming Meals
        </NavLink>
      </Typography>
      <IconButton variant="text" color="black">
        <BellIcon className="h-4 w-4" />
      </IconButton>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink to={"/"}>
          <img src="https://i.ibb.co/pjk2bxX/logo.png" className="w-48" alt="" />
        </NavLink>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {user ? (
            <>
              <div className="dropdown dropdown-end z-10">
                {/* <Tooltip className="z-10" id="my-tooltip" /> */}
                <div
                  className="tooltip"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  data-tooltip-place="left"
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <div className="z-10">
                        <img
                          referrerpolicy="no-referrer"
                          alt="User"
                          src={
                            user.photoURL ? user.photoURL : <FaRegUserCircle />
                          }
                        />
                        <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow active:z-10 bg-base-100 rounded-box w-52"
                        >
                          {userLists}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to={"/signup"}>
                <Button
                  variant="gradient"
                  size="sm"
                  color="blue"
                  className="hidden bg-blue-500 lg:inline-block"
                >
                  <span>Join Us</span>
                </Button>
              </Link>
            </div>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Link to={"/signup"}>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              color="blue"
              className="bg-blue-500"
            >
              <span>Join Us</span>
            </Button>
          </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}
