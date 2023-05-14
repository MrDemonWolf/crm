import express, { Request, Response } from "express";
import { ContactStatus } from "@prisma/client";
import { z } from "zod";
import { consola } from "consola";
import { prisma } from "../db";
import { checkContactStatus } from "../utils/checkContactStatus";
import { zodErrorResponse } from "../utils/zodErrorResponse";

const router = express.Router();

/**
 * @route /contact
 * @method GET
 * @description Get all contacts
 * @access Private
 * @query {string} status - Contact status
 * @query {string} cursor - Cursor id for pagination
 * @returns {object} - contacts, total, pagination, filter
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, cursor } = req.query;

    const take = 12;

    let emptyDataResponse = {
      contacts: [],
      total: 0,
      pagination: {
        cursor: null as string | null,
      },
      filter: {
        status: null as string | null,
      },
    };

    let contacts: any[] = [];
    let cursorId: string | undefined;
    let total: number = 0;

    /**
     * Get all contacts if the status is === all and if it does not have a cursor
     */
    if (status === "all") {
      const isVaildStatus = checkContactStatus(status as string);

      if (!isVaildStatus) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      total = await prisma.contact.count();
      contacts = await prisma.contact.findMany({
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: {
            include: {
              address: true,
            },
          },
        },
      });

      if (contacts.length === 0) {
        emptyDataResponse.filter.status = status;
        return res.status(200).json(emptyDataResponse);
      }

      const cursorId = contacts[contacts.length - 1].id;

      return res.status(200).json({
        contacts,
        total,
        pagination: {
          cursor: cursorId,
        },
      });
    }

    /**
     * Get all contacts if the status is === all and if it has a cursor
     */
    if (status === "all" && cursor) {
      const isVaildStatus = checkContactStatus(status as string);

      if (!isVaildStatus) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      total = await prisma.contact.count();
      contacts = await prisma.contact.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: {
            include: {
              address: true,
            },
          },
        },
      });

      if (contacts.length === 0) {
        emptyDataResponse.filter.status = status;
        return res.status(200).json(emptyDataResponse);
      }

      const cursorId = contacts[contacts.length - 1].id;

      return res.status(200).json({
        contacts,
        total,
        pagination: {
          cursor: cursorId,
        },
      });
    }

    /**
     * Get all contacts if has status and if it does not have a cursor
     */
    if (status) {
      const isVaildStatus = checkContactStatus(status as string);

      if (!isVaildStatus) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      total = await prisma.contact.count({
        where: {
          status: status as ContactStatus,
        },
      });

      contacts = await prisma.contact.findMany({
        take,
        where: {
          status: status as ContactStatus,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: {
            include: {
              address: true,
            },
          },
        },
      });

      if (contacts.length === 0) {
        emptyDataResponse.filter.status = status as string;
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = contacts[contacts.length - 1].id;

      return res.status(200).json({
        contacts,
        total: contacts.length,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          status,
        },
      });
    }

    /**
     * Get all contacts if has status and if it has a cursor
     */
    if (status && cursor) {
      const isVaildStatus = checkContactStatus(status as string);

      if (!isVaildStatus) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      total = await prisma.contact.count({
        where: {
          status: status as ContactStatus,
        },
      });

      contacts = await prisma.contact.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursorId as string,
        },
        where: {
          status: status as ContactStatus,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: {
            include: {
              address: true,
            },
          },
        },
      });

      if (contacts.length === 0) {
        emptyDataResponse.filter.status = status as string;

        return res.status(200).json(emptyDataResponse);
      }

      cursorId = contacts[contacts.length - 1].id;

      return res.status(200).json({
        contacts,
        total: contacts.length,
        pagination: {
          cursor: cursorId,
        },
        filter: {
          status,
        },
      });
    }

    /**
     * Get all contacts if it has a cursor
     */
    if (cursor) {
      total = await prisma.contact.count();
      contacts = await prisma.contact.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: {
            include: {
              address: true,
            },
          },
        },
      });

      if (contacts.length === 0) {
        return res.status(200).json(emptyDataResponse);
      }

      cursorId = contacts[contacts.length - 1].id;

      return res.status(200).json({
        contacts,
        total: contacts.length,
        pagination: {
          cursor: cursorId,
        },
      });
    }
    /**
     * Fall back to get all contacts
     */
    contacts = await prisma.contact.findMany({
      take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: {
          include: {
            address: true,
          },
        },
      },
    });

    if (contacts.length === 0) {
      return res.status(200).json(emptyDataResponse);
    }

    cursorId = contacts[contacts.length - 1].id;

    res.status(200).json({
      contacts,
      total,
      pagination: {
        cursor: cursorId,
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
 * @route /contacts/:id
 * @method GET
 * @description Get a contact by id
 * @access Private
 * @returns { contact }
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        company: {
          include: {
            address: true,
          },
        },
      },
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      contact,
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /contacts
 * @method POST
 * @description Create a new contact
 * @access Private
 * @body { firstName, lastName, email, phoneNumber }
 * @returns { contact, message }
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const schema = z.object({
      firstName: z
        .string()
        .trim()
        .nonempty({ message: "First name is required" })
        .max(255, { message: "Must be less than 255 characters" }),
      lastName: z
        .string()
        .trim()
        .nonempty({ message: "First name is required" })
        .max(255, { message: "Must be less than 255 characters" }),
      email: z
        .string()
        .trim()
        .email({ message: "Must be a valid email" })
        .nonempty({ message: "Email is required" }),
      phoneNumber: z
        .string()
        .max(16, { message: "Must be less than 16 characters" })
        .optional(),
    });

    const validate = schema.safeParse({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    if (!validate.success) {
      return res.status(400).json({
        errors: zodErrorResponse(validate.error),
      });
    }

    const newContact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });

    res.status(201).json({
      contact: newContact,
      message: "Contact created successfully",
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * @route /contacts/:id/link/:companyId
 * @method PUT
 * @description Link a contact to a company
 * @access Private
 * @returns { contact, message }
 * @params { id, companyId }
 */
router.put("/:id/link/:companyId", async (req: Request, res: Response) => {
  try {
    const { id, companyId } = req.params;

    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });

    if (!contact) {
      return res.status(400).json({
        error: "Contact not found",
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      return res.status(400).json({
        error: "Company not found",
      });
    }

    const updatedContact = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });

    res.status(200).json({
      contact: updatedContact,
      message: "Contact linked to company successfully",
    });
  } catch (err) {
    consola.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
