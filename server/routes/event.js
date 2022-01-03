const express = require("express");

// eventRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /event.
const eventRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

console.log("event.js is running")

// This section will help you get a list of all the events.
eventRoutes.route("/event").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log(db_connect);
  db_connect
    .collection("events")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single event by id
eventRoutes.route("/event/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("events")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new event.
eventRoutes.route("/event/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    event_name: req.body.event_name,
    event_location: req.body.event_location,
    event_description: req.body.event_description,
    event_date: req.body.event_date,
    friends_invited: req.body.friends_invited
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update an event by id.
eventRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      event_name: req.body.event_name,
      event_location: req.body.event_location,
      event_description: req.body.event_description,
      event_date: req.body.event_date,
      friends_invited: req.body.friends_invited
    },
  };
  db_connect
    .collection("events")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete an event
eventRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("events").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document (event) deleted");
    response.status(obj);
  });
});

module.exports = eventRoutes;
