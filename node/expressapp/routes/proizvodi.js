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




route.get('/', (req, res) => {
    console.log("PROIZVODI BACKEND")
    //console.log(auth(req, res))
    pool.query('SELECT * FROM `tauretisstatistics_proizvod`', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
            // console.log(rows)
    })
});

route.post('/korpa' ,(req, res) => {

    // let { error } = Joi.validate(req.body, sema)

    // if (error)
        // res.status(400).send(error.details[0].message)  // Greska zahteva
    // else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        // username mora da bude jedinstven
    console.log("PROIZVODI KORPA BACKEND")
    let checkStanja = []
    for(p in req.body){
        mysql.format("select stanje FROM `tauretisstatistics_proizvodi` WHERE id = \""+ p.id + "\"")
        console.log(p)
    }
    pool.query(checkIfUniqueUsername,(err,response) =>{
        console.log(response.length)
        if(response.length){
            res.status(409).send("Korisnik postoji, probaj drugi username")
            return;
        }
        else{
            let query = "insert into `tauretis_korisnici` (`id`, `username`, `password`, `is_admin`) VALUES ('NULL',?,?,?)";
            let password = passwordHash.generate(req.body.password)
            let formated = mysql.format(query, [req.body.username, password, req.body.is_admin]);

            // Izvrsimo query
            pool.query(formated, (err, response) => {

                if (err)
                    res.status(500).send(err.sqlMessage)
                else {
                    // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                    query = 'select * from `tauretis_korisnici` where id=?';
                    formated = mysql.format(query, [response.insertId])

                    pool.query(formated, (err, rows) => {
                        if (err)
                            res.status(500).send(err.sqlMessage)
                        else
                            res.send(rows[0])
                    })
                }
            })
        }
    });
});



module.exports = route;
