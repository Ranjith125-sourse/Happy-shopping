import { RouterProvider } from "react-router-dom";
import appRoute from "./Constants/Routing";
import appStore from "./Constants/appStore";
import {Provider} from "react-redux";


const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <RouterProvider router={appRoute} />
      </Provider>
    </div>
  );
};

export default App;
