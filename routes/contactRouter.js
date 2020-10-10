const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Contacts = require('../models/contact');
const contactRouter = express.Router();

contactRouter.route('/')
.get((req,res,next) => {
    Contacts.find({})
    .then((x) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Contacts.create(req.body)
    .then((x) => {
        console.log('Contacts Created ', x);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contact');
})
.delete((req, res, next) => {
    Contacts.remove({})
    .then((x) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

contactRouter.route('/:contactId')
.get((req,res,next) => {
    Contacts.findById(req.params.contactId)
    .then((x) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /contact/'+ req.params.contactId);
})
.put((req, res, next) => {
    Contacts.findByIdAndUpdate(req.params.contactId, {
        $set: req.body
    }, { new: true })
    .then((x) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Contacts.findByIdAndRemove(req.params.contactId)
    .then((x) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(x);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = contactRouter;