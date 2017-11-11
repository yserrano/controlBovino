var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('listabovinos',['listabovinos']);
var bodyParser = require('body-parser');

// Static es para decirle a server donde buscar los archivos estaticos
//como los html
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/listabovinos', function(req,res){
    console.log("Recibi una solicitud GET")
    
    //Get request
    db.listabovinos.find(function(err,docs){
        console.log(docs);
        res.json(docs);
        
    });
    
});

app.post('/listabovinos',function(req,res){
    console.log(req.body); 
    db.listabovinos.insert(req.body,function(err,doc){
        res.json(doc);
        
    }) 
    
});



app.delete('/listabovinos/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.listabovinos.remove({_id: mongojs.ObjectId(id)}, function (err, doc) { // Puse 'mongojs.ObjectId(id)' pero deberia ir sin corchetes, es que como no ocupamos el de delete.
    res.json(doc);
  });
});


app.get('/listabovinos/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.listabovinos.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/listabovinos/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.identificador);
  db.listabovinos.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {identificador: req.body.identificador, vacuna: req.body.vacuna, fecha: req.body.fecha}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});



app.listen(3001);
console.log("Server running on port 3001");

// Para ver esos mensajes se corre node server en CMD y en el  navegador
// localhost:3000
