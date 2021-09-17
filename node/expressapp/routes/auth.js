const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const jwtsecret = 'partizan'

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    //password
    database: 'tauretisnatural'
});

const route = express.Router();

const sema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(15).required(),
    password: Joi.string().trim().max(10).required(),
    is_admin: Joi.boolean(),
});

route.use(express.json());

route.post('/register' ,(req, res) => {

    let { error } = Joi.validate(req.body, sema)

    if (error)
        res.status(400).send(error.details[0].message)  // Greska zahteva
    else {  // Ako nisu upisemo ih u bazu
        // Izgradimo SQL query string

        // username mora da bude jedinstven

        let checkIfUniqueUsername = mysql.format("select * FROM `tauretis_korisnici` WHERE username = \""+ req.body.username + "\"")
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


    }
});

route.post('/login', (req, res) => {
    console.log("AUTH/LOGIN BACKEND")
    console.log(req.body)
    let { error } = Joi.validate(req.body, sema)

    if (error)
        return res.status(400).send(error.details[0].message)  // Greska zahteva
    else {
        query = 'select * from `tauretis_korisnici` where username=?'
        formated = mysql.format(query, [req.body.username])

        pool.query(formated,  (err, rows) => {

            console.log("usao u pool.query")
            if (err) {
                return res.status(400).send(err)
            }else {
                if( rows[0] == null ){
                    return res.status(400).send("Username doesn't exist")
                }

                // duzina sifre u bazi je morala da se poveca
                console.log(rows[0].password)
                console.log(passwordHash.generate(req.body.password))
                console.log(passwordHash.verify("a", passwordHash.generate("a")))

                if (passwordHash.verify(req.body.password, rows[0].password)){
                    console.log("paswordHash.verify = TRUE")
                    const token = jwt.sign({_id: rows[0].id}, jwtsecret)
                    return res.set({
                        'auth':token,
                        'user': rows[0].username }).send({
                        id: rows[0].id,
                        token: token,
                        username: rows[0].username,
                        is_admin: rows[0].is_admin})
                }else{
                    return res.status(400).send("Password doesn't match")
                }
            }
        })
    }
});

module.exports = route;
