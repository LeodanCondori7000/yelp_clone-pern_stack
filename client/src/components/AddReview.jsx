import { useState, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  // console.log(id);

  // const [forceUpdate, setForceUpdate] = useState(false);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    // e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      console.log(response);

      await navigate("/");
      navigate(location.pathname);

      // setForceUpdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   setForceUpdate(false);
  // }, [forceUpdate]);

  return (
    <div className="mb-2">
      <form action="" onSubmit={handleSubmitReview}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            id="Review"
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          // onClick={handleSubmitReview}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
