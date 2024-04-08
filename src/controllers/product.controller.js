import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  addNewproduct(req, res,next) {
    const { name, desc, price } = req.body;
    const imageUrl =
      'images/' + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.get();
    res.render('products', { products });
  }

  getUpdateProductView(req, res, next) {
    const id = req.params.id;

    const productFound = ProductModel.getById(id);

    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(401).send("product not found");
    }
  }

  postUpdateView(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }
  deleteProduct(req,res){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(!productFound){
      return res.status(401).send("product not found");
    }
    console.log("Confirmation delete id",id)
    ProductModel.delete(id);
    var products = ProductModel.get()
    res.render('products',{products})

  }
}
