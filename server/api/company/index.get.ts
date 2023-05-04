import { prisma } from "@/db";

export default defineEventHandler(async (event) => {
  try {
    // creates a query object from the event
    const query = getQuery(event);

    // this is the number of items to return
    const take = 10;

    // this is the default response if there are no items
    const emptyDataResponse = {
      companies: [],
      total: 0,
      pagination: {},
    };

    // get the total number of items
    const total = await prisma.contact.count();

    // if there is a cursor, return the next set of items
    if (query.cursor) {
      return await prisma.company
        .findMany({
          take,
          skip: 1,
          cursor: {
            id: query.cursor as string,
          },
          include: {
            address: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        })
        .then((companies) => {
          if (companies.length === 0) {
            return emptyDataResponse;
          }

          if (companies.length < take) {
            return {
              companies,
              total,
              pagination: {
                cursor: null,
              },
            };
          }

          const cursor = companies[companies.length - 1].id;

          return {
            companies,
            total,
            pagination: {
              cursor,
            },
          };
        });
    }
    return await prisma.company
      .findMany({
        take,
        include: {
          address: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((companies) => {
        if (companies.length === 0) {
          return emptyDataResponse;
        }

        const cursor = companies[companies.length - 1].id;

        return {
          companies,
          total,
          pagination: {
            cursor,
          },
        };
      });
  } catch (err) {
    console.log(err);
    event.node.res.statusCode = 500;
    return {
      error: "Internal Server Error",
    };
  }
});
