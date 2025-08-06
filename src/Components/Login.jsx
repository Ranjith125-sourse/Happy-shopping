import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".login-text", {
      opacity: 0,
      y: -50,
      duration: 0.5
    }),
      tl.from(".form", {
        opacity: 0,
        duration: 1,
      }),
      tl.from(".input", {
        opacity: 0,
        x: -50,
        duration:0.5,
        stagger: 0.2,
        ease: "power1.out"
      }),
      tl.from(".submit", {
        opacity: 0,
        y:100,
        duration: 0.5,
        ease: "power2.out"
      })
  });

  const users = [
    { email: "admin@gmail.com", password: "admin123", role: "admin" },
    { email: "user@gmail.com", password: "user123", role: "user" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const fakeToken = JSON.stringify({ email: user.email, role: user.role });
      localStorage.setItem("token", fakeToken);
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center  ml-[10rem] -z-10 absolute top-[8vw] border-2 border-lime-500  h-[35vw] w-[89vw] rounded-xl">
      <h1 className="login-text text-[30px] mt-[50px] text-lime-600 mb-3">
        Login Form
      </h1>
      <div className="form bg-lime-500 px-6 py-7 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="input">Email</label>
            <input
              value={email}
              className="input w-[15vw] px-3 py-1 rounded-xl focus:outline-lime-500"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input">Password</label>
            <input
              value={password}
              className="input w-[15vw] px-3 py-1 rounded-xl focus:outline-lime-500"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          <div className="submit self-center">
            <button
            className="mt-3 w-fit border px-3 py-1 rounded-xl border-white transition-all duration-300 hover:bg-white hover:text-lime-600 hover:font-semibold"
            type="submit"
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
