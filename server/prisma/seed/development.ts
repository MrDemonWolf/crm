async function main() {
  const { PrismaClient } = require("@prisma/client");

  const prisma = new PrismaClient();

  // console.log("Purge database...");
  // await prisma.contact.deleteMany();
  // await prisma.company.deleteMany();
  // console.log("Purge complete");

  console.log("Seeding database...");

  for (let i = 0; i < 30; i++) {
    const { faker } = require("@faker-js/faker");
    const contact = {
      firstName: faker.[name].firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      company: {
        create: {
          name: faker.company.name(),
          address: {
            create: {
              street: faker.address.streetAddress(),
              city: faker.address.city(),
              state: faker.address.state(),
              zipCode: faker.address.zipCode(),
              country: faker.address.country(),
            },
          },
          website: faker.internet.url(),
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
