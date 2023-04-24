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
const validateCreateContactInput = require("../validation/contact/ceate-contact");

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
    const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
    const perPage = parseInt(req.query.perPage) || 10; // default to 10 items per page if not specified

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const contacts = await Contact.find({})
      .populate("company activityHistory quote")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(perPage);

    const totalContacts = await Contact.countDocuments({});

    const pagination = {
      currentPage: page,
      perPage,
      totalContacts,
      totalPages: Math.ceil(totalContacts / perPage),
      endIndex
    };

    if (page > pagination.totalPages) {
      return res.status(200).json({ contacts: [], pagination: false });
    }

    res.status(200).json({ contacts, pagination });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

/**
 * @route /contact/:id
 * @description Allows business owner to get a single contact.
 * @access Private
 * @type GET
 */
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate("company activityHistory quote")
      .exec();

    if (!contact) {
      return res.status(404).json({
        code: "NOT_FOUND",
        error: "Contact not found."
      });
    }

    res.status(200).json(contact);
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
    const { errors, isValid } = validateCreateContactInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    /**
     * Check if contact already exists.
     */

    const contactExists = await Contact.findOne({
      email: req.body.email
    });

    if (contactExists) {
      return res.status(400).json({
        code: "DUPLICATE",
        error: "Contact already exists."
      });
    }

    const { firstName, lastName, email, phoneNumber } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    const newContact = await contact.save();

    res.status(201).json(newContact);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

module.exports = router;
