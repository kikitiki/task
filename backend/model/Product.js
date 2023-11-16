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
    this.id = id || generateUniqueId();
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

  get(field) {
    return this[field];
  }

  getById(id) {
    return this.id === id;
  }
}
module.exports = Product;
