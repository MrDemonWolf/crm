import { ContactStatus } from "@prisma/client";

export function checkContactStatus(status: string) {
  if (!Object.values(ContactStatus).includes(status as any)) {
    return false;
  }
  return true;
}
