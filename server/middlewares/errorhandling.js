const { InternalServerError } = require('../lib/customError');

const makeErrorHandling = {
  BadRequestError: (err, req, res) => {
    res.status(400).json({ message: err.message, validationErrors: err.validationErrors });
  },
  NotFoundError: (err, req, res) => {
    res.status(404).json();
  },
  ValidationError: (err, req, res) => {
    const errors = [];

    for (const field in err.errors) {
      errors.push({ [err.errors[field].path]: err.errors[field].message });
      res.status(400).json({ message: '', validationErrors: errors });
    }
  },
  MongoErrors: (err, req, res) => {
    res.status(400).json(err.errmsg);
  },
};

const handleError = (err, req, res, next) => {
  console.log(err);
  const errorFn = makeErrorHandling[err.name] || makeErrorHandling[new InternalServerError(err.message).name];
  errorFn(err, req, res, next);
};

module.exports = handleError;
