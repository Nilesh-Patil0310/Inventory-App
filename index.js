import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middlewares/validation.middlewares.js";
import { fileUplod } from "./src/middlewares/multer.middleware.js";
import UserController from "./src/controllers/user.controller.js";
// const express = require('express');

const server = express();

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// ejs layouts use here
server.use(ejsLayouts);
server.use(express.json());

// create an instance of ProductController
const productController = new ProductController();

// create an instace of Usercontroller
const userController = new UserController();


// get details of all products
server.get("/", productController.getProducts);

// get user resister page
server.get('/register', userController.getRegister);

// get user login page
server.get('/login', userController.getLogin);

// post login credentials
server.post('/login',userController.postLogin);

server.post('/register', userController.postRegister);

// form render to add the new Product
server.get("/add-product", productController.getAddForm);

// form render along with selected product to update
server.get("/update-product/:id", productController.getUpdateProductView);

// get requiest for delete product
server.post('/delete-product/:id', productController.deleteProduct)

// post the form data into products and display on UI
server.post(
    '/add-product',
    fileUplod.single('imageUrl'),
    validationMiddleware,
    productController.addNewproduct
  );

// post the updated data
server.post("/update-product", productController.postUpdateView);

server.use(express.static("src/views"));
// return res.send('Welcome to Inventory App');

server.listen(3400);
console.log("Server is listening on pert 3400");
