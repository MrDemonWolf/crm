import { Prisma } from "@prisma/client";
import { prisma } from "@/db";
import queryString from "query-string";
import { z } from "zod";

import { zodErrorResponse } from "@/utils/zodErrorResponse";

// set up validation for the request body and formate the error messages
const bodySchema = z.object({
  // this is company prsima schema
  name: z.string().max(255, { message: "Must be less than 255 characters" }),
  website: z.string().url({ message: "Invaild website address" }),
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

    const company = await prisma.company.create({
      data: {
        name: body.name,
        website: body.website,
      },
    });

    event.node.res.statusCode = 201;
    return {
      data: company,
    };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      event.node.res.statusCode = 409;
      return {
        error: "Company already exists",
      };
    }

    console.log(err);
    event.node.res.statusCode = 500;
    return {
      error: "Internal Server Error",
    };
  }
});
