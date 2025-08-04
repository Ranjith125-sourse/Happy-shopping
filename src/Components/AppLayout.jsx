import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const AppLayout = () => {
  return (
    <div className="grid">
      <NavBar />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
