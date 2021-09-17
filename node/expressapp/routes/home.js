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



module.exports = route;
