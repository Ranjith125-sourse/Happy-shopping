import { useContext, useEffect, useState } from "react";
import { api } from "../Constants/api";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addItems } from "../Constants/productSlice";
import { ProductContext } from "../Constants/Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products, setProducts, filtered, setFiltered} = useContext(ProductContext);
  const { setCategories, isDark} = useContext(ProductContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
        setCategories([
          "all",
          ...new Set(res.data.map((prod) => prod.category)),
        ]);
        dispatch(addItems(res.data));
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={isDark? "ml-[9rem] bg-gray-950 -z-10 absolute top-[7vw]  h-auto w-[89vw] " : "ml-[9rem] -z-10 absolute top-[7vw]  h-auto w-[89vw] "}>
      <div className="flex justify-between items-center mt-5 px-4">
        
        <div className="flex">
          <div onClick={()=>navigate(-1)} className={isDark? "cursor-pointer transition-all duration-300 hover:bg-white text-lime-500 w-fit text-[25px] m-3 px-4 py-2 rounded-full" : "cursor-pointer transition-all duration-300 hover:bg-lime-500  w-fit text-[25px] m-3 px-4 py-2 rounded-full"}>
          <i class="ri-arrow-left-line"></i>
          </div>
          <div onClick={()=>navigate(+1)} className={isDark? "cursor-pointer transition-all duration-300 hover:bg-white text-lime-500 w-fit text-[25px] m-3 px-4 py-2 rounded-full" : "cursor-pointer transition-all duration-300 hover:bg-lime-500  w-fit text-[25px] m-3 px-4 py-2 rounded-full"}>
          <i class="ri-arrow-right-line"></i>
          </div>
        </div>

        {/* Filter section */}
        <div className="filter flex gap-4 items-center">
          <h1 className={isDark? "text-lime-500": "text-black"}>
            Filter <i class="ri-filter-2-line"></i>
          </h1>{" "}
          <select
            name="Filter"
            className="filter-select px-3 py-1 outline-none rounded-xl border border-black"
            onChange={(e) => {
              if (e.target.value === "Random") {
                setFiltered(products);
              } else if (e.target.value === "Low to High") {
                setFiltered([...products].sort((a, b) => a.price - b.price));
              } else if (e.target.value === "High to Low") {
                setFiltered([...products].sort((a, b) => b.price - a.price));
              } else if (e.target.value === "Popular") {
                setFiltered(products.filter((prod) => prod.rating.rate > 4.0));
              }
            }}
          >
            <option className="filter" value="Random">
              Random
            </option>
            <option className="filter" value="Low to High">
              Low to High
            </option>
            <option className="filter" value="High to Low">
              High to Low
            </option>
            <option className="filter" value="Popular">
              Popular
            </option>
          </select>
        </div>
        
      </div>
      {loading && (
        <div className="flex items-center justify-center p-[220px]">
          <h1 className="border-4 border-black p-4 border-t-transparent rounded-full animate-spin"></h1>
        </div>
      )}
      <div className="card">
        <Card products={filtered} />
      </div>
    </div>
  );
};

export default Home;
