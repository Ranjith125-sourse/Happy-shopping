import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token)
    return (
      <>
        {alert("Need to login first")}
        <Navigate to="/login" />
      </>
    );

  const user = JSON.parse(token);

  if (role && user.role !== role) {
    return (
      <div className="ml-[10vw]">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer transition-all duration-300 hover:bg-lime-500   w-fit text-[25px] m-3 px-4 py-2 rounded-full"
        >
          <i class="ri-arrow-left-line"></i>
        </div>
        <h1 className="h-[29vw] flex items-center justify-center text-[30px]">
          Access denied you are not an admin
        </h1>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
