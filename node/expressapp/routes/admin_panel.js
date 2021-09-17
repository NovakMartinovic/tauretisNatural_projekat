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
    console.log("ADMIN_PANEL BACKEND")
    //console.log(auth(req, res))
    pool.query('SELECT * FROM `tauretis_korisnici`', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)  // Greska servera
        else
            res.send(rows)
            // console.log(rows)
    })
});
route.delete('/:id', (req, res) => {
    console.log("ADMIN_PANEL DELETE")
    let query = 'SELECT * FROM `tauretis_korisnici` WHERE id=?'
    let formated = mysql.format(query, [req.params.id])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)
        else {
            let poruka = rows[0]

            let query = 'delete from `tauretis_korisnici` where id=?'
            let formated = mysql.format(query, [req.params.id])

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage)
                else
                    res.send(poruka)
            })
        }
    })
});




module.exports = route;
