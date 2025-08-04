import { useGSAP } from "@gsap/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import gsap from "gsap";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.item);
  const product = products.find((prod) => prod.id == id);

  useGSAP(()=>{
    let tl = gsap.timeline();
    tl.from(".box", {
      opacity: 0,
      duration: 0.5
    })
    tl.from(".image", {
      opacity: 0,
      duration: 0.5,
      y: -100
    })
    tl.from(".text", {
      opacity: 0,
      duration: 0.8,
      y:-30,
      stagger: 0.1
    })
  })

  return (
    <div className="box ml-[10rem] absolute top-[10vw] bg-yellow-100 h-auto w-[88vw] px-5 py-4 rounded-xl">
      <div className="flex flex-row">
        <div className="h-[30vw] w-1/2  overflow-hidden rounded-xl">
          <img className="image h-full w-full object-fit" src={product.image} alt="" />
        </div> 
        <div className="p-5 w-full flex flex-col gap-4">
            <p className="text font-bold text-[20px]">{product.category}</p>
            <p className="text font-semibold">{product.title}</p>
            <p className="text">₹ {Math.round(product.price)}</p>
            <p className="text"><i class="ri-star-fill text-red-400"></i> {product.rating.rate} ({product.rating.count})</p>
            <p className="text"><span className="font-semibold">Description:</span> {product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
