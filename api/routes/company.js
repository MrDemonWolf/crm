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
 * @description Allows business owner to get a list of companies. These will not be linked to any contacts
 * @access Private
 * @type GET
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
    const perPage = parseInt(req.query.perPage) || 10; // default to 10 items per page if not specified

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const companies = await Company.find({ contact: { $exists: false } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(perPage);

    const totalCompanies = await Company.countDocuments({
      contact: { $exists: false }
    });

    const pagination = {
      currentPage: page,
      perPage,
      totalCompanies,
      totalPages: Math.ceil(totalCompanies / perPage),
      endIndex
    };

    if (page > pagination.totalPages) {
      return res.status(404).json({
        code: "NOT_FOUND",
        error: "Page not found."
      });
    }

    res.status(200).json({ companies, pagination });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

/**
 * @route /company
 * @description Allows business owner to create a new company.
 * @access Private
 * @type POST
 */
router.post("/", async (req, res) => {
  try {
    // TODO: Add validation
    const {
      name,
      phoneNumber,
      addressStreet,
      addressCity,
      addressState,
      addressZip
    } = req.body;

    const company = new Company({
      name,
      phoneNumber,
      address: {
        addressStreet,
        addressCity,
        addressState,
        addressZip
      }
    });

    const newCompany = await company.save();

    res.status(201).json(newCompany);
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

module.exports = router;
