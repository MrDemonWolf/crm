import { prisma } from "@/db";

export default defineEventHandler(async (event) => {
  try {
    // Calculate the number of new contacts comapred to 30 days ago and let me know if we are up or down comapred to now
    const newContacts = await prisma.contact.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
    const oldContacts = await prisma.contact.count({
      where: {
        createdAt: {
          lt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const newContactsUp = newContacts < oldContacts;
    const newContactsDown = newContacts > oldContacts;

    return {
      totalContacts: await prisma.contact.count(),
      newContacts,
      oldContacts,
      newContactsUp,
      newContactsDown,
    };
  } catch (err) {
    console.log(err);
    event.node.res.statusCode = 500;
    return {
      error: "Internal Server Error",
    };
  }
});
