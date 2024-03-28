import path from 'path';
import ProdectModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProdectModel.get()
        console.log(products)
        return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));
    }
}