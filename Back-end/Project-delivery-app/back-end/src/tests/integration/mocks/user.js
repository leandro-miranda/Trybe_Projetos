const users = [
  {
    id: 1,
    email: "adm@deliveryapp.com",
    name: "Delivery App Admin",
    password: "a4c86edecc5aee06eff8fdeda69e0d04",
    role: "administrator",
  },
  {
    id: 2,
    email: "fulana@deliveryapp.com",
    name: "Fulana Pereira",
    password: "3c28d2b0881bf46457a853e0b07531c6",
    role: "seller",
  },
  {
    id: 3,
    email: "zebirita@email.com",
    name: "Cliente Zé Birita",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer",
  },
];

const buyerLogin = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const sellerLogin = {
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
};

const adminLogin = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--',
};

const buyerOutput = {
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTI3NjIzOCwiZXhwIjoxNjc1NTM1NDM4fQ.7oib4U8QJSwo7-XsO8Ard2OARMEARSw0y66G5dUy3iQ",
  role: "customer",
}

const sellers = [
  users[1]
]

const registerInput = {
  name: "icaro joel moura",
  email: "icaro@moura.com",
  password: "icaro#123",
  role: "customer",
}

const registerCreateOutput = {
  id: 4,
  name: "icaro joel",
  email: "icaro@moura.com",
  password: "fd0397ae48265933ea9597b9458d3aeb",
  role: "customer"
}

const registerOutput = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NTM2MzI0NywiZXhwIjoxNjc1NjIyNDQ3fQ.qQsthYAnjgHYx3k2BAIqkHcVEWIj0MQ6Qh_nrxfpgJ8",
  name: "icaro joel",
  email: "icaro@moura.com",
  role: "customer",
}

module.exports = {
  users,
  sellers,
  adminLogin,
  buyerLogin,
  sellerLogin,
  buyerOutput,
  registerInput,
  registerCreateOutput,
  registerOutput,
};