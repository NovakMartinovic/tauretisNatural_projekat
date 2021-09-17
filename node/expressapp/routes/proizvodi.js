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




route.get('/api/', (req, res) => {
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





module.exports = route;
