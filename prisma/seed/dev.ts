async function main() {
  const { PrismaClient } = require("@prisma/client");

  const prisma = new PrismaClient();

  console.log("Seeding database...");

  for (let i = 0; i < 50; i++) {
    const { faker } = require("@faker-js/faker");
    const contact = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      createdAt: faker.date.past(30),
      updatedAt: faker.date.past(30),
      company: {
        create: {
          name: faker.company.name(),
          address: {
            create: {
              streetAddress: faker.address.streetAddress(),
              city: faker.address.city(),
              state: faker.address.state(),
              zipCode: faker.address.zipCode(),
              country: faker.address.country(),
            },
          },
          website: faker.internet.url(),
          createdAt: faker.date.past(30),
          updatedAt: faker.date.past(30),
        },
      },
    };

    await prisma.contact.create({
      data: {
        ...contact,
      },
    });
    console.log(`Created contact ${contact.firstName} ${contact.lastName}`);
  }
  console.log("Seeding complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
