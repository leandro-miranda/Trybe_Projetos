// const ErrorCustom = require('./ErrorCustom');

// class ErrorGlobal {
//   constructor(statusDefault = 500) {
//     this.statusDefault = statusDefault;
//   }

//   handle(err, _req, res, _next) {
//     if (err instanceof ErrorCustom) {
//       return res.status(err.status).json({ message: err.message });
//     }
//     return res.status(this.statusDefault || 500).json({ message: err.message });
//   }
// }

// const errorGlobal = new ErrorGlobal();

// module.exports = errorGlobal;