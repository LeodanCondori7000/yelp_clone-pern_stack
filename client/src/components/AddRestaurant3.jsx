import { useReducer, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const initialState = {
  name: "",
  location: "",
  priceRange: "Price Range",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, location, priceRange } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
      dispatch({ type: "RESET_FORM" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "priceRange") {
      dispatch({ type: `SET_PRICE_RANGE`, payload: value });
    }
    // the if condition just above would not be necessary if SET_PRICE_RANGE
    // were SET_PRICE, and the select name were "price" instead of priceRange,
    // and we would need our third state to name onnly "price"

    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={handleChange}
              name="name"
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={handleChange}
              name="location"
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={handleChange}
              name="priceRange"
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
