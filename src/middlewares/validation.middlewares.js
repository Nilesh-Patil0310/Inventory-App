import { body, validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {
  //   setup rules for validators
  console.log(req.body)
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive number"),
    body("imageUrl").custom((value, {req})=>{
       if(!req.file){
        throw new Error('Image is required')
       }
       return true
    })
  ];

  //   Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //    check idf there are any error after the running the rules
  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render("new-product", { errorMessage: validationErrors.array()[0].msg });
  }
  next();
};

export default validationMiddleware;
