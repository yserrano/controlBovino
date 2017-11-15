var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var BOVINOS_COLLECTION = "bovinos";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// BOVINOS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/bovino"
 *    GET: finds all bovino
 *    POST: creates a new bovino
 */

app.get("/api/bovinos", function(req, res) {
  db.collection(BOVINOS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Ha fallado obtener el bovino.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/bovinos", function(req, res) {
  var newBovino = req.body;
  newBovino.createDate = new Date();

  if (!req.body.identificador) {
    handleError(res, "Invalid user input", "Debe ingresar un identificador para el bovino.", 400);
  }

  db.collection(BOVINOS_COLLECTION).insertOne(newBovino, function(err, doc) {
    if (err) {
      handleError(res, err.message, "No se ha podido hacer el registro");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/bovino/:id"
 *    GET: find bovino by id
 *    PUT: update bovino by id
 *    DELETE: deletes bovino by id
 */

app.get("/api/bovinos/:id", function(req, res) {
  db.collection(BOVINOS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Ha fallado obtener el bovino");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/bovinos/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BOVINOS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Ha fallado actualizar el bovino.");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/bovinos/:id", function(req, res) {
  db.collection(BOVINOS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Ha fallado eliminar el bovino.");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
