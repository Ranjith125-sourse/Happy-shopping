import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCartItems,
  decreaseQuantity,
  removeItem,
} from "../Constants/cartSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state?.cart?.cartItems);

  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.from(".first", {
      opacity: 0,
      duration: 0.5
    }),
    tl.from(".cart", {
      opacity: 0,
      y: -50,
      ease: "power3.inOut"
    })
  })

  console.log(cartItems);
  return (
    <div className="first ml-[10rem] -z-10 absolute top-[10vw]  h-auto w-[89vw] px-10 py-10 bg-gray-200 rounded-xl">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer transition-all duration-300 hover:bg-lime-500  w-fit text-[25px] m-3 px-4 py-2 rounded-full"
      >
        <i className="ri-arrow-left-line"></i>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="cart relative flex px-20 gap-3 justify-evenly bg-gray-600 py-3 rounded-xl my-3">
            <div className="w-1/3 h-[20vw]">
              <img
                className="w-full h-full object-fit rounded-xl"
                src={item?.image}
                alt=""
              />
            </div>
            <div className="text-white w-1/2 flex flex-col items-start justify-center">
              <p>
                <span className="font-semibold text-lime-500">Products:</span>{" "}
                {item?.title}
              </p>
              <p>
                <span className="font-semibold text-lime-500">Price:</span> ₹
                {Math.round(item?.price)}
              </p>
              <p>
                <span className="font-semibold text-lime-500">Category:</span>{" "}
                {item?.category}
              </p>
              <p>
                {" "}
                <span className="font-semibold text-lime-500">
                  Description:{" "}
                </span>{" "}
                {item?.description}
              </p>

              <div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="bg-lime-500 px-3 py-1 mt-3 rounded-xl"
                >
                  Remove item
                </button>
              </div>
            </div>
            <div className="">
              <span className="text-lime-500 font-semibold">Quantity :</span>{" "}
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="font-semibold text-white text-[20px]"
              >
                -
              </button>{" "}
              {item?.quantity}{" "}
              <button
                onClick={() => dispatch(addCartItems(item))}
                className="font-semibold text-white text-[20px]"
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="second bg-lime-400 flex h-[20vw] items-center justify-center rounded-xl">
          {" "}
          <h1 className="text-[30px]">There is no item added in cart</h1>{" "}
        </div>
      )}
    </div>
  );
};

export default Cart;
