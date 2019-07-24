var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getUsers', function (req, res, next) {

  // me conecto a la base de datos de herok --> por medio del plugin mLab 
  MongoClient.connect('mongodb://usrneoris:Neoris1@ds039195.mlab.com:39195/heroku_zfhwvv72', { useNewUrlParser: true }, function (err, client) {
    if (err) throw err

    // indicamos la base de datos
    var db = client.db('heroku_zfhwvv72');

    // indicamos la coleccion
    db.collection('neoris').find().toArray(function (err, result) {

      if (err) throw err

      // if (result != null) {
      //   let objError = {
      //     mensaje: 'no hay usuarios',
      //     code: -1
      //   };
      //   // res.send(new throw Exception('-1'));
      // }

      console.log(result);
      res.send(result);
    })
  })



});



router.post('/saveUsers', function (req, res, next) {

  MongoClient.connect('mongodb://usrneoris:Neoris1@ds039195.mlab.com:39195/heroku_zfhwvv72', { useNewUrlParser: true },
    function (err, client) {
      if (err) throw err;

      var develop = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        categoria: req.body.categoria
      };

      var db = client.db('heroku_zfhwvv72')
      db.collection('neoris').insertOne(develop).then(x => {
        console.log('OK');
        res.send('ok');
      }, err => {
        console.log(err);
        res.send(err);
      });

    });
});


module.exports = router;
