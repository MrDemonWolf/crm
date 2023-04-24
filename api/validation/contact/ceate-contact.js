const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = data => {
  const codes = {};
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 28 })) {
    codes.firstName = "NOT_LONG_ENOUGH";
    errors.firstName = "First name must be between 2 and 28 characters long.";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 28 })) {
    codes.lastName = "NOT_LONG_ENOUGH";
    errors.lastName = "Last name must be between 2 and 28 characters long.";
  }

  if (!Validator.isEmail(data.email)) {
    codes.email = "INVALID";
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.firstName)) {
    codes.firstName = "REQUIRED";
    errors.firstName = "First name is required.";
  }

  if (Validator.isEmpty(data.lastName)) {
    codes.lastName = "REQUIRED";
    errors.lastName = "Last name is required.";
  }

  if (Validator.isEmpty(data.email)) {
    codes.email = "REQUIRED";
    errors.email = "Email is required.";
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
