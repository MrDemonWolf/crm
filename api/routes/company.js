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
      return res.status(200).json({ contacts: [], pagination: false });
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
 * @route /company/:company_id
 * @description Allows business owner to get a company by id.
 * @access Private
 * @type GET
 */
router.get("/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;

    const company = await Company.findById(company_id);

    if (!company) {
      return res.status(404).json({
        code: "NOT_FOUND",
        error: "Company not found."
      });
    }

    res.status(200).json(company);
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
 * @route /company/link/?company_id=&contact_id=
 * @description Allows business owner to link company to contact with contact id.
 * @access Private
 * @type PUT
 */
router.put("/link", async (req, res) => {
  try {
    const { company_id, contact_id } = req.query;

    // TODO: Add validation

    const company = await Company.findById(company_id);

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

    /**
     * Check if company is already linked to a contact.
     */
    if (company.contact) {
      return res.status(400).json({
        code: "COMPANY_ALREADY_LINKED",
        error: "Company is already linked to a contact."
      });
    }

    company.contact = contact.id;

    await company.save();

    res.status(200).json({
      code: "COMPANY_LINKED",
      message: "Company successfully linked to contact.",
      company
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "SERVER_ERROR",
      error: "Internal Server Error."
    });
  }
});

module.exports = router;
