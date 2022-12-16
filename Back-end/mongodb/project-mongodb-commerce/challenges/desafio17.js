db.resumoProdutos.insertMany([
  {
    franquia: "McDonalds",
    totalProdutos: db.produtos.count(),
  },
]);

db.resumoProdutos.find(
  {},
  {
    _id: 0,
    franquia: 1,
    totalProdutos: 1,
  },
);