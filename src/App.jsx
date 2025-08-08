import { RouterProvider } from "react-router-dom";
import appRoute from "./Constants/Routing";
import appStore from "./Constants/appStore";
import { Provider } from "react-redux";
import { ProductContext } from "./Constants/Context";
import { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [isDark, setIsDark] = useState(false);

  useEffect(()=>{
    document.body.style.backgroundColor = isDark ? "#111827" : "";
  }, [isDark])

  return (
    <div>
      <ProductContext.Provider
        value={{ products, setProducts, filtered, setFiltered, categories, setCategories, loggedIn, setLoggedIn, isDark, setIsDark }}
      >
        <Provider store={appStore}>
          <RouterProvider router={appRoute} />
        </Provider>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
