import { useEffect, useState } from "react";
import { api } from "../Constants/api";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addItems } from "../Constants/productSlice";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
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

  useGSAP(()=>{
    let tl = gsap.timeline();
    tl.from(".search", {
      y: -50,
      duration:0.5,
      delay: 1.5,
      opacity: 0,
      ease: "power1.out"
    }),
    tl.from(".filter", {
      y: -50,
      duration:0.5,
      opacity: 0,
      ease: "power1.out"
    }),
    tl.from(".category", {
      y: -50,
      duration:0.5,
      opacity: 0,
      ease: "power1.out"
    })
  })

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

  return (
    <div className="ml-[9rem] -z-10 absolute top-[7vw] bg-yellow-100 h-auto w-[89vw] ">
      <div className="flex justify-evenly items-center mt-5 px-4">
        <div className="search">
          <input
            placeholder="Search here"
            value={searchText}
            className="border px-3 py-1 mr-3 outline-none rounded-xl"
            type="search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="text-[20px]" onClick={() => handleSearch()}>
            <i class="ri-search-2-line"></i>
          </button>
        </div>
        {/* Filter section */}
        <div className="filter flex gap-4 items-center">
          <h1>
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
              Propular
            </option>
          </select>
        </div>
        {/* Category section */}
        <div className="category flex gap-4 items-center">
          <h1>Category</h1>
          <select
            className="outline-none px-3 py-1 rounded-xl border border-black"
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
              <option key={index} value={prod}>
                {prod}
              </option>
            ))}
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
