import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import path from "path"
import ejsLayouts from 'express-ejs-layouts';
// const express = require('express');

const server = express();

server.use(express.urlencoded({extended:true}))
// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// ejs layouts use here
server.use(ejsLayouts);

// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.get('/new', productController.getAddForm);
server.post('/', productController.addNewproduct)
server.use(express.static('src/views'));
    // return res.send('Welcome to Inventory App');
server.listen(3400);
console.log('Server is listening on pert 3400');