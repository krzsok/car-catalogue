var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
	host: 'localhost', /* host: '172.30.24.12'  */
	user: 'xxxx',
	password: 'xxxx',
	database: 'xxxx'
});
con.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

  var sql = 'SELECT * FROM listasam';
  con.query(sql, function(err,rows){
        res.render('index', { title: 'Katalog samochodów', dane: rows });
   });
});

module.exports = router;
