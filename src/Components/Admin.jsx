import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Constants/Context";
import { api } from "../Constants/api";

const Admin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rate] = useState(0);
  const [count] = useState(0);
  const { products, setProducts } = useContext(ProductContext);
  
  console.log(image)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId =
      products.length > 0
        ? Math.max(...products.map((prod) => Number(prod.id))) + 1
        : 1;
    const newProduct = {
      id: newId,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: rate,
        count: count
      }
    };
    try {
      const res = await api.post("/products", newProduct);
      setProducts([res.data, ...products])
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  };

  //For creating image URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(file) {
      const link = URL.createObjectURL(file);
      setImage(link) 
    }
  }

  return (
    <div className="flex flex-col items-center  ml-[10rem] -z-10 absolute top-[8vw] bg-lime-400 rounded-xl  h-[35vw] w-[89vw] ">
      {/* Back button */}
      <div
        onClick={() => navigate(-1)}
        className="self-start cursor-pointer transition-all duration-300 hover:bg-lime-500   w-fit text-[25px] m-3 px-4 py-2 rounded-full"
      >
        <i class="ri-arrow-left-line"></i>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-[30px] font-mono">Adding New Product</h1>
        <div className="bg-lime-400 w-fit h-fit mt-2 p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="px-3 py-1 border border-black rounded-xl"
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="px-3 py-1 border border-black rounded-xl"
              value={price}
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="px-3 py-1 border border-black rounded-xl"
              value={description}
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="px-3 py-1 border border-black rounded-xl"
              value={category}
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={(e)=>handleImageUpload(e)} />
            <input
              className="px-3 py-1 border border-black rounded-xl"
              type="number"
              placeholder="Rating"
            />
            <input
              className="px-3 py-1 border border-black rounded-xl"
              type="number"
              placeholder="Count"
            />
            <button className="px-3 py-1 border border-black rounded-xl w-fit self-center">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
