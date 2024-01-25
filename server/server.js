require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const port = process.env.PORT || 3001;

// const validateRestaurantData = (req, res, next) => {
//   const { name, location, price_range } = req.body;

//   if (!name || !location || !price_range) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   next();
// };

// app.use("/api/v1/restaurants", validateRestaurantData);

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    // console.log(results.rows);

    const restaurantRatingsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, count(*),trunc(avg(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );

    // console.log("results",results);
    // console.log("restaurant data",restaurantRatingsData);

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: { restaurants: restaurantRatingsData["rows"] },
    });
    // res.status(200).json({
    //   status: "success",
    //   results: results.rows.length,
    //   data: { restaurants: results["rows"] },
    // });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//get a restaurant
// app.get("/api/v1/restaurants/:id", async (req, res) => {
//   try {
//     // const result = await db.query(
//     //   "SELECT * FROM restaurants WHERE id = " + req.params.id
//     // );
//     const restaurant = await db.query(
//       "SELECT * FROM restaurants WHERE id = $1",
//       [req.params.id]
//     );
//     // console.log(result.rows[0]);
//     const reviews = await db.query(
//       "SELECT * FROM reviews WHERE restaurant_id = $1",
//       [req.params.id]
//     );
//     console.log(reviews);
//     res.status(200).json({
//       status: "success",
//       data: { restaurant: restaurant.rows[0], reviews: reviews.rows },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    // select * from restaurants wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results.rows);
    res
      .status(201)
      .json({ status: "success", data: { restaurant: results.rows[0] } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1,location = $2,price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    // console.log(results);
    res
      .status(200)
      .json({ status: "success", data: { restaurant: results.rows[0] } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);

    res.status(204).json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews ( restaurant_id,name,review,rating) VALUES ( $1,$2,$3,$4) RETURNING *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("server is up and listening on port " + port);
});
