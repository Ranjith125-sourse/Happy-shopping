import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { addCartItems } from "../Constants/cartSlice";

const Card = ({ products }) => {
  const dispatch = useDispatch();

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".card", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    })
  });

  const handleCart = (id) => {
    gsap.to(".addCart", {
      scale: 1.5,
      yoyo: true,
      repeat: 1,
      duration: 0.1
    })
    const cart = products.find((prod) => prod.id === id);
    dispatch(addCartItems(cart))
  }

  return (
    <div className="card flex flex-wrap mx-6 ml-10 gap-4 my-5 justify-around ">
      {products &&
        products.map((prod) => (
          <div
            key={prod.id}
            className="my-2 h-auto bg-gray-200 shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            <div className=" h-[27vw] rounded-xl">
              <div className="h-56 w-60 ">
                <Link to={`/home/productdetails/${prod.id}`}>
                  <img
                    className="h-full w-full object-fit rounded-t-xl "
                    src={prod.image}
                    alt=""
                  />
                </Link>
              </div>
              <div className="w-60 px-2 py-5 flex flex-col gap-2">
                <p>{prod.title}</p>
                <p>₹ {Math.round(prod.price)}</p>
                <p>
                  <i className="ri-star-fill text-red-400"></i>{" "}
                  {prod.rating.rate}
                </p>
              </div>
            </div>
              <div onClick={()=>{
                handleCart(prod.id)
              }} className="addCart cursor-pointer px-3 py-2 mb-4 transition-all duration-300 hover:bg-lime-700 hover:text-white rounded-xl w-fit mx-3">Add to Cart</div>
          </div>
        ))}
    </div>
  );
};

export default Card;
