import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const ContactWithCompany = Prisma.validator<Prisma.ContactArgs>()({
  include: {
    company: {
      include: {
        address: true,
      },
    },
  },
});

const CompanyWithAddress = Prisma.validator<Prisma.CompanyArgs>()({
  include: {
    address: true,
  },
});

const CompanyWithContacts = Prisma.validator<Prisma.CompanyArgs>()({
  include: {
    contact: true,
  },
});

const CompanyWithAddressAndContacts = Prisma.validator<Prisma.CompanyArgs>()({
  include: {
    address: true,
    contact: true,
  },
});

export type ContactWithCompany = Prisma.ContactGetPayload<
  typeof ContactWithCompany
>;

export type CompanyWithContacts = Prisma.CompanyGetPayload<
  typeof CompanyWithContacts
>;

export type CompanyWithAddress = Prisma.CompanyGetPayload<
  typeof CompanyWithAddress
>;

export type CompanyWithAddressAndContacts = Prisma.CompanyGetPayload<
  typeof CompanyWithAddressAndContacts
>;
