const fetchItemUrl = (idItem) => `https://api.mercadolibre.com/items/${idItem}`;

const fetchItem = async (idItem) => {
  try {
    const url = fetchItemUrl(idItem);
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
