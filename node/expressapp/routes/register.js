const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'tauretisnatural'
});

const route = express.Router();
route.use(express.json());




route.post('/', (req, res) => {
    console.log("REGISTER BACKEND")
    //console.log(auth(req, res))


    let query = "insert into `tauretis_korisnici` (`id`, `username`, `password`, `is_admin`) VALUES ('NULL',?,?,?)";
    let formated = mysql.format(query, [req.body.username, req.body.password, req.body.is_admin]);
    console.log(formated)
    pool.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
            query = 'select * from `tauretis_korisnici` where id=?';
            formated = mysql.format(query, [response.insertId]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
        }
    });
})




module.exports = route;
