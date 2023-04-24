const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = data => {
  const codes = {};
  const errors = {};

  const name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(name)) {
    codes.name = "REQUIRED";
    errors.name = "Company name is required.";
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
