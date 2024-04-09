import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }

  postRegister(req, res) {
    const { name, email, passwaord } = req.body;
    UserModel.add(name, email, passwaord);
    res.render("login",{ errorMessage: null });
  }

  postLogin(req, res) {
    const { email, passwaord } = req.body;
    const user = UserModel.isValidUser(email, passwaord);

    if (!user) {
      return res.render("login", { errorMessage: "Invalid Creadentials" });
    }
    var products = ProductModel.get();
    res.render('products',{products})
  }
}
