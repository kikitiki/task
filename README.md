# task

This backend service is implemented using Express.js and MySQL, providing various functionalities for managing products.
You can use Postman to test the functionality of each endpoint.
The server will run at http://localhost:3000.

API Endpoints
1. Page with all products listed
   URL: http://localhost:3000/getAll
   Method: GET
   Description: Retrieve a list of all products.

2. Product details page
   URL: http://localhost:3000/product/:id
   Method: GET
   Description: Retrieve details of a specific product.

3. Add a new product
   URL: http://localhost:3000/product/
   Method: POST
   Description: Add a new product to the database.

4. Remove a product
   URL: http://localhost:3000/delete/:id
   Method: DELETE
   Description: Remove a product from the database.

5. Filter products by category
   URL: http://localhost:3000/filter?category=
   Method: GET
   Description: Filter products by a specific category.

6. Search products by name or description
   URL: http://localhost:3000/searchByName?term=
   Method: GET
   Description: Search for products by name or description.

7. Sort products by price
   URL: http://localhost:3000/getSortByPriceDesc?sort=desc
   Method: GET
   Description: Sort products by price in ascending or descending order.

   
   
