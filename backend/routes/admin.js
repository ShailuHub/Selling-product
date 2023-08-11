const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");

router.get("/admin/add-product/:productId", adminControllers.getSingleProduct);
router.get("/admin/add-product", adminControllers.getAddedProducts);
router.post("/admin/add-product", adminControllers.postNewProduct);
router.patch("/admin/edit-products/:productId", adminControllers.editProduct);
router.delete(
  "/admin/delete-product/:productId",
  adminControllers.deleteProduct
);

module.exports = router;
