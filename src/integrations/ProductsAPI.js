import { PRODUCTS_API_ENDPOINT } from '../defaults/Endpoints';

class ProductsAPI {

  static fetchProducts() {
    return new Promise((resolve, reject) => {
      fetch(PRODUCTS_API_ENDPOINT)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    });
  }

  static deleteProduct(ProductId) {
    return new Promise((resolve, reject) => {
      fetch(`${PRODUCTS_API_ENDPOINT}/${ProductId}`, {
        method: 'delete'
      })
      .then(resolve)
      .catch(reject);
    });
  }

  static editProduct(Product) {
    return new Promise((resolve, reject) => {
      fetch(`${PRODUCTS_API_ENDPOINT}/${Product.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...Product,
          image: `http://lorempixel.com/200/200/technics/?random=${Product.id}`
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

  static createProduct(Product) {
    return new Promise((resolve, reject) => {
      fetch(`${PRODUCTS_API_ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify({
          ...Product,
          image: `http://lorempixel.com/200/200/technics/`
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

}

export default ProductsAPI;
