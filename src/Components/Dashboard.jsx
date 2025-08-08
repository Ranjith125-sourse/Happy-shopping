import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Constants/Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(ProductContext);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".main", {
      opacity: 0,
      duration: 1,
    }),
      tl.from(".user", {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.2,
        ease: "elastic.out",
      });
  });

  useEffect(() => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  return (
    <div className="main flex flex-col items-center pt-20 ml-[10rem] -z-10 absolute top-[8vw] bg-lime-400 rounded-xl h-auto w-[89vw] ">
      <div className="mb-[200px]">
        <h1 className="user text-[50px]">Welcome! {token.email}</h1>
        <p className="user text-[30px]">Role: {token.role}</p>
        <div className="user">
          <button
            className="border-2 border-white rounded-xl px-3 py-1 transition-all duration-300 mt-10 hover:bg-white hover:text-lime-500"
            onClick={() => navigate("/dashboard/admin")}
          >
            Go to the admin page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
