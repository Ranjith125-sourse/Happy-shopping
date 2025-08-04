import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-yellow-100 h-screen">
      <h1 className="text-[30px] font-semibold">❌ Oops... Page not found</h1>
      <Link to={"/home"}>
        <p className="animate-bounce mt-5"><i class="ri-arrow-right-line"></i> Back to home</p>
      </Link>
    </div>
  );
};

export default Error;
