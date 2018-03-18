var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: 'localhost', /* host: '172.30.24.12' uczelniany */
    user: 'sokol_1089292',
    password: '742482439',
    database: 'SOKOL'
});
con.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/*
 * GET carlist.
 */
router.get('/carlist', function(req, res) {
    var sql = 'SELECT * FROM listasam';
    con.query(sql, function(err,rows){
        res.send(rows);
    });
});

/*
 * POST to addcar.
 */
router.post('/addcar', function(req, res) {

    //var sql = 'INSERT INTO listasam VALUES  (null, "Omega", "Opel", "1991", "2499", "127");';
    var sql = 'INSERT INTO listasam VALUES (null, "' + req.body.marka + '", "' + req.body.model + '", "' + req.body.rokprodukcji + '", "' + req.body.pojemnosc+ '", "' + req.body.moc + '");';
    //alert(sql);
    con.query(sql, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletecar.
 */
router.delete('/deletecar/:id', function(req, res) {

    var carToDelete = req.params.id;
    var sql = 'DELETE FROM listasam WHERE samochodID =' + parseInt(carToDelete) +  ';';
    //alert(sql);
    con.query(sql, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
