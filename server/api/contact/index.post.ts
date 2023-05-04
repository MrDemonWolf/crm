import { prisma } from "@/db";
import queryString from "query-string";
import { z } from "zod";

import { zodErrorResponse } from "@/utils/zodErrorResponse";

// set up validation for the request body and formate the error messages
const bodySchema = z.object({
  firstName: z
    .string()
    .max(255, { message: "Must be less than 255 characters" }),
  lastName: z
    .string()
    .max(255, { message: "Must be less than 255 characters" }),
  email: z.string().email({ message: "Invaild email address" }),
  phoneNumber: z
    .string()
    .max(16, { message: "Must be less than 16 characters" })
    .optional(),
});

// set up the type for the request body
type Body = z.infer<typeof bodySchema>;

export default defineEventHandler(async (event) => {
  try {
    const body = queryString.parse(await readBody(event)) as Body;

    // validate the request body
    const validatedBody = bodySchema.safeParse(body);

    // if the request body is invalid, return a 400 response
    if (!validatedBody.success) {
      event.node.res.statusCode = 400;
      return {
        errors: zodErrorResponse(validatedBody.error),
      };
    }

    const contact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
      },
    });

    event.node.res.statusCode = 201;
    return {
      data: contact,
    };
  } catch (err) {
    console.log(err);
    event.node.res.statusCode = 500;
    return {
      error: "Internal Server Error",
    };
  }
});
