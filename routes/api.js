var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const sendAllUsers = (req, res) => {
  db("SELECT * FROM users ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
};

router.get("/users", (req, res) => {
  // Send back the full list of items
  sendAllUsers(req, res);
});

router.post("/users", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `INSERT INTO users (first_name, last_name, email, tel_number, contact_preference) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", ${req.body.tel_number}, "${req.body.contact_preference}" );
    SELECT LAST_INSERT_ID();`
  )
    .then((results) => {
      let newUserId = results.data[0].insertId;
      db(
        `INSERT INTO requests (request, user_id, complete) VALUES ("${req.body.request}", "${newUserId}", 0 );`
      )
      .then(() => {
        sendAllUsers(req, res);
      })
      .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));

});

router.put("/users/:user_id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `UPDATE users SET 
    first_name = "${req.body.first_name}", 
    last_name = "${req.body.last_name}", 
    email = "${req.body.email}", 
    tel_number = ${req.body.tel_number}, 
    contact_preference = "${req.body.contact_preference}" WHERE id = ${req.params.user_id};`
  )
    .then(() => {
      sendAllUsers(req, res);
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/users/:user_id", (req, res) => {
  // URL params are available in req.params
  // Add your code here
  db(`DELETE FROM users WHERE id=${req.params.user_id};`)
    .then(() => {
      sendAllTodos(req, res);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
