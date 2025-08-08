import { useGSAP } from "@gsap/react";
import { api } from "../Constants/api";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems } from "../Constants/cartSlice";
import { ProductContext } from "../Constants/Context";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isDark} = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products`);
        setProduct(res?.data?.find((prod) => prod?.id == id));
      } catch (error) {
        console.log("Error is: " + error);
      }
    };

    fetchData();
  }, [id]);


  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".box", {
      opacity: 0,
      duration: 0.5,
    });
    tl.from(".image", {
      opacity: 0,
      duration: 0.5,
      y: -100,
    });
    tl.from(".text", {
      opacity: 0,
      duration: 0.8,
      y: -30,
      stagger: 0.1,
    }),
      tl.from(".addCart", {
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: "elastic.out",
      });
  });

  return (
    <div className={isDark? "border-2 border-lime-500 ml-[10rem] absolute top-[9vw] bg-gray-500 text-white h-auto w-[88vw] px-5 py-4 rounded-xl" : "border-2 border-lime-500 ml-[10rem] absolute top-[9vw] bg-gray-100 h-auto w-[88vw] px-5 py-4 rounded-xl"}>
      <div
        onClick={() => navigate(-1)}
        className={isDark? "cursor-pointer text-lime-500 transition-all duration-300 hover:bg-white   w-fit text-[25px] m-3 px-4 py-2 rounded-full" : "cursor-pointer transition-all duration-300 hover:bg-lime-500   w-fit text-[25px] m-3 px-4 py-2 rounded-full"}
      >
        <i class="ri-arrow-left-line"></i>
      </div>
      <div className="flex flex-row">
        <div className="h-[30vw] w-1/2  overflow-hidden rounded-xl">
          <img
            className="image h-full w-full object-fit"
            src={product.image}
            alt=""
          />
        </div>
        <div className="p-5 w-full flex flex-col gap-4">
          <p className="text font-bold text-[20px]">{product?.category}</p>
          <p className="text font-semibold">{product?.title}</p>
          <p className="text">₹ {Math.round(product?.price)}</p>
          <p className="text">
            <i class="ri-star-fill text-red-400"></i> {product?.rating?.rate} (
            {product?.rating?.count})
          </p>
          <p className="text">
            <span className="font-semibold">Description:</span>{" "}
            {product?.description}
          </p>
          <div
            onClick={() => {
              dispatch(addCartItems(product));
            }}
            className="cursor-pointer px-3 py-2 mb-4 transition-all duration-300  hover:bg-lime-600 hover:text-white rounded-xl w-fit mx-3"
          >
            <p className="addCart font-semibold">Add to Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
