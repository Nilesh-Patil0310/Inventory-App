import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product",{errorMessage:null});
  }

  addNewproduct(req, res) {
    ProductModel.add(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }

  getUpdateProductView(req,res,next){
    const {id} = req.body;

    const productFound = ProductModel.getById(id);

    if(productFound){
        res.render('update-product');
    }else{
        res.status(401).send('product not found')
    }
  }
}
