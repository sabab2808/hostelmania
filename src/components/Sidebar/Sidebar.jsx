import {
    FaAd,
    FaBook,
    FaCalendar,
    FaEnvelope,
    FaHome,
    FaList,
    FaSearch,
    FaShoppingCart,
    FaUsers,
    FaUtensils,
  } from "react-icons/fa";
  import { NavLink, Outlet } from "react-router-dom";
  import { MdFastfood, MdReviews } from "react-icons/md";
  import { GiHotMeal, GiMeal } from "react-icons/gi";
import useAdmin from "../../hooks/useAdmin";

const Sidebar = () => {
    const [isAdmin] = useAdmin();
  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-blue-400 text-white w-full drawer-button lg:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 bg-[#5271FF] text-white min-h-full">
            <img src="https://i.ibb.co/cDm00d5/logo-server.png" alt="" />
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li></li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaHome></FaHome>
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    <FaUtensils></FaUtensils>
                    Add Meal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allMeals">
                    <MdFastfood></MdFastfood>
                    Manage Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allReviews">
                    <MdReviews></MdReviews>
                    All Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/serveMeals">
                    <GiHotMeal></GiHotMeal>
                    Serve Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/upcomingMeals">
                    <GiMeal></GiMeal>
                    Upcoming Meals
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaHome></FaHome>
                    User Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requestedMeals">
                    <GiMeal></GiMeal>
                    Requested Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myreviews">
                    <FaAd></FaAd>
                    My Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payments">
                    <FaList></FaList>
                    My Payments
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
