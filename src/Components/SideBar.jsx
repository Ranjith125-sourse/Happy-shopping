import { useContext } from "react";
import { ProductContext } from "../Constants/Context";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { loggedIn, setLoggedIn } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="container bg-lime-600 shadow-2xl fixed h-screen w-[10vw] flex flex-col items-center justify-center ">
      <ul className="text-white">
        <li className="sidebar">Mock</li>
      </ul>
      <div className="logout">
        {loggedIn ? (
          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="border-2 border-white rounded-xl px-3 py-1"
          >
            <i class="ri-logout-circle-line"></i> Logout
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SideBar;
