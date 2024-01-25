CREATE TABLE restaurants(
  id INT,
  name VARCHAR(50),
  location VARCHAR(50),
  price_range INT
);

CREATE TABLE restaurants(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants(id, name, location, price_range)
VALUES(123, 'mcdonalds', 'new york',3);

INSERT INTO restaurants(name, location, price_range)
VALUES('mcdonalds', 'new york',3);

INSERT INTO restaurants(name, location, price_range)
VALUES('wendys', 'denver',3);

INSERT INTO restaurants(name, location, price_range)
VALUES('La mundial', 'Arequipa',3);

-- the following is different from the prior ones
INSERT INTO restaurants(name, location, price_range)
VALUES('cheesecake factory', 'dallas',4) RETURNING *;

SELECT * FROM restaurants WHERE id = 1;

UPDATE restaurants SET name = 'taco bell', location = 'miami', price_range = 2 WHERE id = 6;

UPDATE restaurants SET name = 'taco bell', location = 'miami', price_range = 2 WHERE id = 6 RETURNING *;

DELETE FROM restaurants WHERE id = 6;

CREATE TABLE reviews(
  id BIGSERIAL NOT NULL primary key,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5)
);

INSERT INTO reviews(
  restaurant_id,name,review,rating
) VALUES(
  1,'Carl','restaurant was awesome',5
);

INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 4,
        'Denise',
        'bad restaurant',
        5);

INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 4,
        'Denise',
        'Horrible restaurant',
        5);
INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 1,
        'Juan',
        'morvelous restaurant',
        5);
INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 1,
        'Leo',
        'not so bad',
        5);
INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 4,
        'Leo',
        'could be better',
        5);
INSERT INTO reviews( restaurant_id,name,review,rating)
VALUES( 7,
        'Leo',
        'there is room for improvement',
        3);

SELECT * FROM reviews WHERE restaurant_id = 1;

SELECT count(*) FROM reviews;

SELECT min(rating) FROM reviews;

SELECT AVG(rating)
FROM reviews;

SELECT trunc(AVG(rating),3)
FROM reviews;

SELECT trunc(AVG(rating),3)
AS average_review
FROM reviews;

SELECT trunc(AVG(rating),2) AS avg_rating
FROM reviews
WHERE restaurant_id = 1;

SELECT count(rating)
FROM reviews
WHERE restaurant_id = 1;

SELECT location, count(location) FROM restaurants GROUP BY location;

SELECT restaurant_id, count(restaurant_id) FROM reviews GROUP BY restaurant_id;

SELECT avg(rating) FROM reviews WHERE id = 1;

SELECT restaurant_id, avg(rating)
FROM reviews GROUP BY restaurant_id;

SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT *
FROM restaurants
LEFT JOIN (SELECT restaurant_id, count(*),trunc(avg(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;

select *
from restaurants
left join
  (select restaurant_id,
          COUNT(*),
          TRUNC(AVG(rating),1) as average_rating
   from reviews
   group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id
where id = 8;