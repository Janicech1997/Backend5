const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { productsController } = require("../controllers");

const { getProducts, createProduct, updateProduct, deleteProduct } =
  productsController;

router.get("/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.post("/createProduct", async (req, res) => {
  const body = req.body;

  try {
    const newProduct = await createProduct(body);
    res.status(201);
    res.send(newProduct);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400);
      return res.send({
        message: "Error de validación",
        reason: err.message,
      });
    }
    res.status(500);
    return res.send({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await updateProduct(id, body);

  if (!product) {
    res.status(404);
    return res.send({
      message: `El producto con sku: ${id}, no se encuentra`,
    });
  }
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await deleteProduct(id);

  res.send(result);
});

module.exports = router;
