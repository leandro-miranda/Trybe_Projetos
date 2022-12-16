db.produtos.updateOne(
  {
    nome: "Big Mac",
  },
  {
    $set: {
      ultimaModificacao: new Date(),
    },
  },
);

db.produtos.find(
  {
    ultimaModificacao: {
      $exists: true,
    },
  },
  {
    _id: 0,
    nome: 1,
  },
);