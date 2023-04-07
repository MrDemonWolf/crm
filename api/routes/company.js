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
 * @route /company
 * @description Allows business owner to get a list of companies.
 * @access Private
 * @type GET
 */
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({}).select("-__v");

    res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});
/**
 * @route /company/notlinked
 * @description Allows business owner to get a list of companies.  That are not currently linked to a contact.
 * @access Private
 * @type GET
 */
router.get("/notlinked", async (req, res) => {
  try {
    // find ones they are not linked to a contact
    const companies = await Company.find({
      contact: { $exists: false }
    }).select("-__v");

    res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

/**
 * @route /company/:copmany_id/link
 * @description Allows business owner to link company to contact with contact id.
 * @access Private
 * @type PUT
 */
router.put("/:copmany_id/link", async (req, res) => {
  try {
    const { copmany_id } = req.params;
    const { contact_id } = req.body;

    const company = await Company.findById(copmany_id);

    if (!company) {
      return res.status(404).json({
        code: "NOT_FOUND",
        error: "Company not found."
      });
    }

    const contact = await Contact.findById(contact_id);

    if (!contact) {
      return res.status(404).json({
        code: "NOT_FOUND",
        error: "Contact your trying to link to does not exist."
      });
    }

    company.contact = contact.id;

    await company.save();

    res.status(200).json(company);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});
