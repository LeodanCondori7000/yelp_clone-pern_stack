import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        {/* <BrowserRouter>
        <Switch>
          <Route exact path="/" Component={Home} />
          <Route exact path="/restaurants/:id/update" Component={UpdatePage} />
          <Route
            exact
            path="/restaurants/:id/"
            Component={RestaurantDetailPage}
          />
        </Switch>
      </BrowserRouter> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
