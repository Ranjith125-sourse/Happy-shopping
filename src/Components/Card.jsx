import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { addCartItems } from "../Constants/cartSlice";
import { useContext, useState } from "react";
import { ProductContext } from "../Constants/Context";

const Card = ({ products }) => {
  const dispatch = useDispatch();
  const {isDark} = useContext(ProductContext);
  const [count, setCount] = useState([]);

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
    const cart = products.find((prod) => prod.id === id);
    dispatch(addCartItems(cart))
    setCount((prev) => [...prev, id])
  }

  return (
    <div className="card flex flex-wrap mx-6 ml-10 gap-4 my-5 justify-around ">
      {products &&
        products.map((prod) => (
          <div
            key={prod.id}
            className={isDark? "my-2 h-auto bg-gray-600 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 border-2 hover:border-lime-500 hover:shadow-lime-500" : "my-2 h-auto bg-gray-200 shadow-lg rounded-xl transition-all duration-300 hover:scale-105 border-2 hover:border-lime-500 hover:shadow-lime-500"}
          >
            <div className=" h-[27vw] rounded-xl ">
              <div className="h-56 w-60 p-4">
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
              <div  className="addCart cursor-pointer px-3 py-2 mb-4 transition-all duration-300 hover:bg-lime-600 hover:text-white rounded-xl w-fit mx-3">
                {
                  count.includes(prod.id) ? (<button disabled><i class="ri-check-double-line"></i> Added</button>) : (<button onClick={()=>handleCart(prod.id)}>Add to cart</button>)
                }
              </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
