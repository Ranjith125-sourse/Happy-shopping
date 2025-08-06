import { RouterProvider } from "react-router-dom";
import appRoute from "./Constants/Routing";
import appStore from "./Constants/appStore";
import { Provider } from "react-redux";
import { ProductContext } from "./Constants/Context";
import { useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <ProductContext.Provider
        value={{ products, setProducts, filtered, setFiltered, categories, setCategories, loggedIn, setLoggedIn }}
      >
        <Provider store={appStore}>
          <RouterProvider router={appRoute} />
        </Provider>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
