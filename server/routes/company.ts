import express, { Request, Response } from "express";
import { z } from "zod";
import { consola } from "consola";
import { prisma } from "../db";
import { zodErrorResponse } from "../utils/zodErrorResponse";

const router = express.Router();

/**
 * @route /company
 * @method GET
 * @description Get all companies
 *  @access Private
 * @query {string} linked - Check if company is linked to a contact
 * @query {string} cursor - Cursor id for pagination
 * @returns {object} - companies, total, pagination, filter
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { linked, cursor } = req.query;

    const take = 12;

    const emptyDataResponse = {
      companies: [],
      total: 0,
      pagination: {
        status: null as string | null,
      },
      filter: {
        linked: false as Boolean | null,
      },
    };

    let companies: any[] = [];
    let cursorId: string | undefined;
    let total: number = 0;

    /**
     * Get all companies that are linked to a contact and if it does not have a cursor
     */
    if (linked === "true") {
      total = await prisma.company.count({
        where: {
          contact: {
            isNot: null,
          },
        },
      });

      companies = await prisma.company.findMany({
        take,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          contact: {
            isNot: null,
          },
        },
        include: {
          address: true,
          contact: true,
        },
      });

      if (companies.length === 0) {
        emptyDataResponse.filter.linked = true;
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = companies[companies.length - 1].id;

      return res.status(200).json({
        companies,
        total,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          linked: true,
        },
      });
    }

    /**
     * Get all companies that are linked to a contact and if does have a cursor
     */
    if (linked === "true" && cursor) {
      total = await prisma.company.count({
        where: {
          contact: {
            isNot: null,
          },
        },
      });

      companies = await prisma.company.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          contact: {
            isNot: null,
          },
        },
        include: {
          address: true,
          contact: true,
        },
      });

      if (companies.length === 0) {
        emptyDataResponse.filter.linked = true;
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = companies[companies.length - 1].id;

      return res.status(200).json({
        companies,
        total,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          linked: true,
        },
      });
    }

    /**
     * Get all companies that are not linked to a contact
     */
    if (linked === "false") {
      total = await prisma.company.count({
        where: {
          contact: {
            is: null,
          },
        },
      });

      companies = await prisma.company.findMany({
        take,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          contact: {
            is: null,
          },
        },
        include: {
          address: true,
          contact: true,
        },
      });

      if (companies.length === 0) {
        emptyDataResponse.filter.linked = false;
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = companies[companies.length - 1].id;

      return res.status(200).json({
        companies,
        total,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          linked: false,
        },
      });
    }

    /**
     * Get all companies that are not linked to a contact and if it does have a cursor
     */
    if (linked === "false" && cursor) {
      total = await prisma.company.count({
        where: {
          contact: {
            is: null,
          },
        },
      });

      companies = await prisma.company.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          contact: {
            is: null,
          },
        },
        include: {
          address: true,
          contact: true,
        },
      });

      if (companies.length === 0) {
        emptyDataResponse.filter.linked = false;
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = companies[companies.length - 1].id;

      return res.status(200).json({
        companies,
        total,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          linked: false,
        },
      });
    }

    /**
     * If only cursor is provided
     */
    if (cursor) {
      total = await prisma.company.count();

      companies = await prisma.company.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          address: true,
          contact: true,
        },
      });

      if (companies.length === 0) {
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = companies[companies.length - 1].id;

      return res.status(200).json({
        companies,
        total,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          linked: null,
        },
      });
    }

    /**
     * Fall back to get all contacts
     */

    total = await prisma.company.count();

    companies = await prisma.company.findMany({
      take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        address: true,
        contact: true,
      },
    });

    if (companies.length === 0) {
      return res.status(200).json(emptyDataResponse);
    }

    cursorId = companies[companies.length - 1].id;

    res.status(200).json({
      companies,
      total,
      pagination: {
        cursor: cursorId,
      },
      filter: {
        linked: null,
      },
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /company
 * @method POST
 * @description Create a new company
 * @access Private
 * @body name, addressStreet, addressCity, addressState, addressZipCode, addressCountry, website
 * @returns { company, message }
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, website } = req.body;

    const schema = z.object({
      name: z
        .string()
        .nonempty({
          message: "Name is required",
        })
        .max(255, {
          message: "Name must be less than 255 characters",
        }),
      website: z.string().url({
        message: "Website must be a valid URL",
      }),
    });

    const validate = schema.safeParse({
      name,
      website,
    });

    if (!validate.success) {
      return res.status(400).json({
        errors: zodErrorResponse(validate.error),
      });
    }

    const newCompany = await prisma.company.create({
      data: {
        name,
        website,
      },
    });

    res.status(201).json({
      company: newCompany,
      message: "Company created successfully",
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /company/:id
 * @method GET
 * @description Get a company by id
 * @access Private
 * @param id
 * @returns Company
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
        contact: true,
      },
    });

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /company/:id
 * @method PUT
 * description Update a company by id and return the updated company
 * @access Private
 * @param id
 * @body name, website
 */

/**
 * @route /company/:id/address
 * @method POST
 * @description Create a new company address and link it to the company by id
 * @access Private
 * @param id
 * @body street, city, state, zipCode, country
 * @returns Company
 * @returns { company, message }
 */
router.post("/:id/address", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { street, city, state, zipCode, country } = req.body;

    const schema = z.object({
      street: z.string().max(255, {
        message: "Address street must be less than 255 characters",
      }),
      city: z.string().max(255, {
        message: "Address city must be less than 255 characters",
      }),

      state: z.string().max(255, {
        message: "Address state must be less than 255 characters",
      }),
      zipCode: z.string().max(255, {
        message: "Address zip code must be less than 255 characters",
      }),
      country: z.string().max(255, {
        message: "Address country must be less than 255 characters",
      }),
    });

    const validate = schema.safeParse({
      street,
      city,
      state,
      zipCode,
      country,
    });

    if (!validate.success) {
      return res.status(400).json({
        errors: zodErrorResponse(validate.error),
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    if (company.addressId) {
      return res.status(400).json({
        error: "Company already has an address",
      });
    }

    const newAddress = await prisma.companyAddress.create({
      data: {
        street,
        city,
        state,
        zipCode,
        country,
      },
    });

    const updatedCompany = await prisma.company.update({
      where: {
        id,
      },
      data: {
        address: {
          connect: {
            id: newAddress.id,
          },
        },
      },
      include: {
        address: true,
        contact: true,
      },
    });

    res.status(201).json({
      company: updatedCompany,
      message:
        "Company address created successfully and has been linked to the company",
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /company/:id/contact/:contactId
 * @method PATCH
 * @description Update a company contact by id and return the updated company
 * @access Private
 * @param id
 * @param contactId
 * @returns Company
 */
router.patch("/:id/contact/:contactId", async (req: Request, res: Response) => {
  try {
    const { id, contactId } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(400).json({
        error: "Company not found",
      });
    }

    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!contact) {
      return res.status(400).json({
        error: "Contact not found",
      });
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id,
      },
      data: {
        contact: {
          connect: {
            id: contactId,
          },
        },
      },
      include: {
        address: true,
        contact: true,
      },
    });

    res.status(200).json({
      company: updatedCompany,
      message: "Company contact has been linked to a contact",
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /company/:id/note/:noteId
 * @method PATCH
 * @description Remove the note from the database and company notes array and return the updated company
 * @access Private
 * @param id
 * @param noteId
 * @returns Company
 */

export default router;
