import { Router } from "express";
import * as productController from '../controller/product-controller';
import * as saleController from "../controller/sale-controller"
const router = Router()

//product
router.post("/product", productController.save)
router.get("/product", productController.findAll)
router.get("/product/name", productController.findName)
router.get("/product/:id", productController.findId)
router.delete("/product/:id", productController.deleteById)
router.put("/product/:id", productController.update)
//sale
router.post("/sale", saleController.save)
router.get("/sale", saleController.listSale)


export default router;