import { ZodError } from "zod";

export const zodErrorResponse = (errors: ZodError) => {
  return Object.fromEntries(
    errors.errors.map((error) => [error.path.join("."), error.message])
  );
}
