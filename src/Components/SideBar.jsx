import { useContext } from "react";
import { ProductContext } from "../Constants/Context";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { loggedIn, setLoggedIn, isDark } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className={isDark? "container border-l-4 border-lime-500 bg-gray-900 text-lime-500 shadow-2xl fixed h-screen w-[10vw] flex flex-col items-center justify-center" : "container bg-lime-600 shadow-2xl fixed h-screen w-[10vw] flex flex-col items-center justify-center"}>
      <ul className="text-white mb-4 text-[20px]">
        <li className={isDark? "sidebar text-lime-500 cursor-pointer" : "sidebar cursor-pointer"} onClick={()=>navigate('/dashboard')}>Dashboard</li>
      </ul>
      <div className="logout">
        {loggedIn ? (
          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("loggedIn");
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
