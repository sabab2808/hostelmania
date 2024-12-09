import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="z-10">
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1 p-8 poppins">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
