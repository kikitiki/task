const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { json } = require("body-parser");
const mysql = require("mysql");
const Product = require("./model/Product");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "data",
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, this is your Express.js server!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

axios
  .get("https://30hills.com/api/products.json")
  .then((response) => {
    const data = response.data;

    pool.getConnection((err, connection) => {
      if (err) throw err;

      data.products.data.items.forEach((item) => {
        const imagesString = JSON.stringify(item.images);
        connection.query(
          "INSERT INTO products SET ? ON DUPLICATE KEY UPDATE id=id",
          { ...item, images: imagesString },
          (error, results, fields) => {
            if (error) throw error;
            console.log("Inserted:", results.insertId);
          }
        );
      });

      connection.release();
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error.message);
  });

app.get("/getAll", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const getAllProducts = "SELECT * FROM products";

    connection.query(getAllProducts, (error, results) => {
      connection.release();

      if (error) throw error;
      let message = "";
      if (results === undefined || results.length == 0)
        message = "Products table is empty";
      else message = "Successfully retrieved all products";

      return res.status(200).json({ product: results });
    });
  });
});

app.get("/product/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    const id = req.params.id;
    const getProduct = "SELECT * FROM products WHERE id = ?";

    connection.query(getProduct, [id], (err, result) => {
      connection.release();

      if (err) {
        console.log("Error while getting product", err);
        return res.status(500).json({ Error: "Error while getting product" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ Error: "Product not found!" });
      }
      console.log("Successfully get product with id: ", id);
      return res.status(200).json({ product: result[0] });
    });
  });
});

app.post("/product", (req, res) => {
  pool.getConnection((err, connection) => {
    const productData = req.body;
    const product = new Product(
      productData.id,
      productData.name,
      productData.description,
      productData.features,
      productData.price,
      productData.keywords,
      productData.url,
      productData.category,
      productData.subcategory,
      productData.images,
      productData.salePrice
    );
    const imageString = JSON.stringify(product.images);

    connection.query(
      "INSERT INTO products (id, name, description, features, price, keywords, url, category, subcategory, images, salePrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        product.id,
        product.name,
        product.description,
        product.features,
        product.price,
        product.keywords,
        product.url,
        product.category,
        product.subcategory,
        imageString,
        product.salePrice,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("Error inserting data:", error.message);
          res.status(500).json({ error: "Internal server error!" });
        } else {
          console.log("Inserted: ", results.insertId);
          res.status(200).json({ message: "Product inserted successufully!" });
        }
      }
    );
  });
});

app.delete("/delete/:id", (req, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const id = req.params.id;

    const deleteSql = "DELETE FROM products where id = ?";

    connection.query(deleteSql, [id], (err, res) => {
      if (err) {
        console.log("Error while deleting product ", err);
        return result
          .status(500)
          .json({ Error: "Error while deletin product" });
      }
      if (res.affectedRows === 0) {
        return result.status(404).json({ Message: "Product not found" });
      }
      console.log("Successfully deleted product with id: ", id);
      return result.status(200).json({ Status: "Success" });
    });
  });
});
