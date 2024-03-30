import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product",{errorMessaeg:null});
  }

  addNewproduct(req, res) {
    // validating data
    const { name, price, imageUrl } = req.body;
    let error=[];
    if (!name || name.trim() == "") {
      error.push("Name is required");
    }

    if (!price || parseFloat(price) < 1) {
      error.push("Price must be a positive");
    }

    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      error.push("URL is Invalid");
    }

    if (error.length > 0) {
      return res.render("new-product", { errorMessaeg: error[0] });
    }
    ProductModel.add(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }
}
