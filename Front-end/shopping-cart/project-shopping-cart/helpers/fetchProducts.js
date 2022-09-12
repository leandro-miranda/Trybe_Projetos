const fetchProductsUrl = (product) =>
`https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (product) => {
  try {
    const url = fetchProductsUrl(product);
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
