import { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    priceRange: "Price Range",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: formData.name,
        location: formData.location,
        price_range: formData.priceRange,
      });
      // console.log(response.data.data);
      addRestaurants(response.data.data.restaurant);
      // formData.name = "";
      // formData.location = "";
      // formData.priceRange = "Price Range";
      // alternatively you can use the following:
      setFormData((data) => ({
        name: "",
        location: "",
        priceRange: "Price Range",
      }));
    } catch (err) {
      console.log(err);
    }
    // you can put this code here, 
    // this ensures that the state is reset 
    // even if there's an error in the server request
    // setFormData((data) => ({
    //   name: "",
    //   location: "",
    //   priceRange: "Price Range",
    // }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              name="location"
              onChange={handleChange}
              value={formData.location}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              name="priceRange"
              onChange={handleChange}
              value={formData.priceRange}
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
