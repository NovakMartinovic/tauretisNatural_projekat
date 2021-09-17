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

const sema = Joi.object().keys({
    header: Joi.string().trim().min(4).max(15).required(),
    content: Joi.string().trim().max(255).required(),
    date: Joi.string(),
    userid: Joi.string()
});

route.use(express.json());

route.get('/korisnici', (req, res) => {
    // Saljemo upit bazi
    pool.query('select ', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});


//
// route.get('/proizvodi', (req, res) => {
//     console.log("HOME PROIZVODI")
//     // Saljemo upit bazi
//     pool.query('select IME, OPIS, STANJE, CENA from tauretisstatistics_proizovdi', (err, rows) => {
//         if (err)
//             res.status(500).send(err.sqlMessage);
//         else
//             res.send(rows);
//     });
// });




module.exports = route;
