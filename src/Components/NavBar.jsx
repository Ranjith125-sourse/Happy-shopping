import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Constants/Context";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { products, setFiltered, categories } = useContext(ProductContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const { loggedIn, isDark, setIsDark } = useContext(ProductContext);

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".brand", {
      y: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "bounce.out",
    }),
      tl.from(".search", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      }),
      tl.from(".category", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      }),
      tl.from(".filter", {
        y: -50,
        duration: 0.5,
        opacity: 0,
        ease: "power1.out",
      }),
      tl.from(".container", {
        x: -100,
        opacity: 0,
        duration: 1,
      }),
      tl.from(".sidebar", {
        x: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }),
      tl.from(".logout", {
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: "elastic.inOut",
      });
  });

  //Search box
  const handleSearch = () => {
    const searchedProd = products.filter((prod) =>
      prod.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchedProd.length === 0) {
      navigate("/notfound");
    } else {
      setFiltered(searchedProd);
    }
    setSearchText("");
  };

  //Auto searching
  useEffect(() => {
    if(!searchText) return;

    const timer = setTimeout(() => {
      const searchedProd = products.filter((prod) =>
        prod.title.toLowerCase().includes(searchText.toLowerCase())
      );
      if (searchedProd.length === 0) {
        return navigate("/notfound");
      } else {
        setFiltered(searchedProd);
        navigate("/home");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className={isDark? "bg-gray-900 text-white h-[7vw] z-10 shadow-xl border-b-2 border-lime-600" : "bg-gray-200 h-[7vw] z-10 shadow-xl border-b-2 border-lime-600"}>
      <div className="flex justify-between">
        <div className=" h-[7vw] px-4 flex items-center">
          <h1 className="brand text-[45px]  font-extralight text-lime-600">
            Happy Shopping
          </h1>
        </div>
        {/* Search section */}
        <div className="flex items-center">
          <div className="search">
            <input
              placeholder="Search here"
              value={searchText}
              className="border px-3 py-1 mr-3 outline-lime-500 rounded-xl"
              type="search"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button className="text-[20px]" onClick={() => handleSearch()}>
              <i className="ri-search-2-line text-lime-500"></i>
            </button>
          </div>
        </div>

        {/* Category section */}
        <div className="category flex gap-4 items-center">
          <h1>Category</h1>
          <select
            className={isDark? "outline-none px-3 py-1 rounded-xl border border-lime-500" : "outline-none px-3 py-1 rounded-xl border"}
            onChange={(e) => {
              if (e.target.value === "all") {
                setFiltered(products);
              } else {
                setFiltered(
                  products.filter((prod) => prod.category === e.target.value)
                );
              }
            }}
          >
            {categories.map((prod, index) => (
              <option className="text-black" key={index} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mr-6 items-center px-4 text-[20px] font-mono">
        <button onClick={()=>setIsDark(!isDark)}>{isDark? <i className="sun ri-sun-fill text-[30px]"></i> : <i className="moon ri-moon-fill text-[30px]"></i>}</button>

          <Link to={"/home"}>
            <p className="menu border px-3 py-1 rounded-xl border-lime-600 transition-all duration-300 hover:bg-lime-600 hover:text-white">
              <i class="ri-home-line"></i> Home
            </p>
          </Link>

          <Link to={"/home/cart"}>
            <p className="relative menu border px-3 py-1 rounded-xl border-lime-600 transition-all duration-300 hover:bg-lime-600 hover:text-white">
              <i class="ri-shopping-cart-line"></i> Cart
              {cartItems && `-${cartItems.length}`}
              <i
                className={
                  cartItems.length > 0
                    ? "animate-ping absolute -top-1.5 right-0 ri-circle-fill text-lime-600 text-[10px]"
                    : ""
                }
              ></i>
            </p>
          </Link>
          {loggedIn ? (
            ""
          ) : (
            <Link to={"/login"}>
              <p className="menu border px-3 py-1 rounded-xl border-lime-600 transition-all duration-300 hover:bg-lime-600 hover:text-white">
                <i className="ri-login-circle-line"></i> Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
