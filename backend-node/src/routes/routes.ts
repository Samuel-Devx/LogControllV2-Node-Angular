import { Router } from "express";
import * as productController from '../controller/product-controller';


const router = Router()

router.post("/product", productController.save)
router.get("/product", productController.findAll)
router.get("/product/name", productController.findName)
router.get("/product/:id", productController.findId)
router.delete("/product/:id", productController.deleteById)
export default router;