import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center  ml-[10rem] -z-10 absolute top-[8vw] bg-lime-400  h-[35vw] w-[89vw] ">
      <div>
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer transition-all duration-300 hover:bg-lime-500   w-fit text-[25px] m-3 px-4 py-2 rounded-full"
        >
          <i class="ri-arrow-left-line"></i>
        </div>
        <h1>This is the Admin page only admin can access it</h1>
      </div>
    </div>
  );
};

export default Admin;
