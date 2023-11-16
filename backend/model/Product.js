class Product {
  constructor(
    id,
    name,
    description,
    features,
    price,
    keywords,
    url,
    category,
    subcategory,
    images,
    salePrice
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.features = features;
    this.price = price;
    this.keywords = keywords;
    this.url = url;
    this.category = category;
    this.subcategory = subcategory;
    this.images = images;
    this.salePrice = salePrice;
  }
}
module.exports = Product;
