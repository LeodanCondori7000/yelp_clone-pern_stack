const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   password: "celestial7000",
//   host: "localhost",
//   port: 5432, // default Postgres port
//   database: "yelp_practice",
// });
// if you have your .env file properly cofigured, you can use this:
const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};
