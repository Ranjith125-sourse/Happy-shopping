import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NavBar = () => {
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".brand", {
      y: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "bounce.out",
    }),
      tl.from(".menu", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.3,
        ease: "bounce.out",
      });
      tl.from(".container", {
        x: -100,
        opacity: 0,
        duration: 1
      }),
      tl.from(".sidebar", {
      x: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.1
    })
  });

  return (
    <div className="bg-yellow-200 h-[7vw] z-10 shadow-xl">
      <div className="flex justify-between">
        <div className=" h-[7vw] px-4 flex items-center">
          <h1 className="brand text-[45px]  font-extralight">Happy Shopping</h1>
        </div>
        <div className=" flex gap-4 mr-6 items-center px-4 text-[20px] font-mono">
          <Link to={"/home"}>
            <p className="menu border px-3 py-1 rounded-xl border-black">
              <i class="ri-home-line"></i> Home
            </p>
          </Link>

          <p className="menu border px-3 py-1 rounded-xl border-black">
            <i class="ri-shopping-cart-line"></i> Cart
          </p>
          <p className="menu border px-3 py-1 rounded-xl border-black">About</p>
          <p className="menu border px-3 py-1 rounded-xl border-black">
            <i class="ri-user-line"></i> Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
