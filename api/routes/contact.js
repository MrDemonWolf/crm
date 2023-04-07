const express = require("express");

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Contact = require("../models/Contact");
const Company = require("../models/Company");
const Activity = require("../models/Activity");
const Quote = require("../models/Quote");

/**
 * Load input validators.
 */

/**
 * Load Email Templates.
 */

/**
 * @route /contact
 * @description Allows business owner to get a list of contacts.
 * @access Private
 * @type GET
 */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .populate("company activityHistory quote")
      .select("-__v");

    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

/**
 * @route /contact
 * @description Allows business owner to create a new contact.
 * @access Private
 * @type POST
 */
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    const newContact = await contact.save().select("-__v");

    res.status(201).json(newContact);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

/**
 * @route /contact/:id/company

module.exports = router;
