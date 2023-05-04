import { prisma } from "@/db";

import { ContactStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    // creates a query object from the event
    const query = getQuery(event);

    // this is the number of items to return
    const take = 10;

    // this is the default response if there are no items
    const emptyDataResponse = {
      contacts: [],
      total: 0,
      pagination: {},
      filter: {
        status: null,
      },
    };

    // get the total number of items
    const total = await prisma.contact.count();

    console.log(query);

    if (query.status) {
      if (query.status === "all") {
        return await prisma.contact
          .findMany({
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
          })
          .then((contacts) => {
            if (contacts.length === 0) {
              return emptyDataResponse;
            }

            const cursor = contacts[contacts.length - 1].id;

            return {
              contacts,
              total,
              pagination: {
                cursor,
              },
              filter: {
                status: "all",
              },
            };
          });
      }
      // type check on ContactStatus
      if (!Object.values(ContactStatus).includes(query.status as any)) {
        event.node.res.statusCode = 400;
        return {
          error: "Invalid status",
        };
      }

      return await prisma.contact
        .findMany({
          take,
          skip: 1,
          where: {
            status: query.status as ContactStatus,
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
        })
        .then((contacts) => {
          if (contacts.length === 0) {
            return emptyDataResponse;
          }

          const cursor = contacts[contacts.length - 1].id;

          return {
            contacts,
            total,
            pagination: {
              cursor,
            },
            filter: {
              status: query.status as ContactStatus,
            },
          };
        });
    }
    // if there is a cursor, return the next set of items
    if (query.cursor) {
      return await prisma.contact
        .findMany({
          take,
          skip: 1,
          cursor: {
            id: query.cursor as string,
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
        })
        .then((contacts) => {
          if (contacts.length === 0) {
            return emptyDataResponse;
          }

          if (contacts.length < take) {
            return {
              contacts,
              total,
              pagination: {
                cursor: null,
              },
            };
          }

          const cursor = contacts[contacts.length - 1].id;

          return {
            contacts,
            total,
            pagination: {
              cursor,
            },
          };
        });
    }

    if (query.status && query.cursor) {
      if (query.status === "all") {
        return await prisma.contact
          .findMany({
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
          })
          .then((contacts) => {
            if (contacts.length === 0) {
              return emptyDataResponse;
            }

            const cursor = contacts[contacts.length - 1].id;

            return {
              contacts,
              total,
              pagination: {
                cursor,
              },
              filter: {
                status: "all",
              },
            };
          });
      }
      // type check on ContactStatus
      if (!Object.values(ContactStatus).includes(query.status as any)) {
        event.node.res.statusCode = 400;
        return {
          error: "Invalid status",
        };
      }

      return await prisma.contact
        .findMany({
          take,
          skip: 1,
          cursor: {
            id: query.cursor as string,
          },
          where: {
            status: query.status as ContactStatus,
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
        })
        .then((contacts) => {
          if (contacts.length === 0) {
            return emptyDataResponse;
          }

          const cursor = contacts[contacts.length - 1].id;

          return {
            contacts,
            total,
            pagination: {
              cursor,
            },
            filter: {
              status: query.status as ContactStatus,
            },
          };
        });
    }

    return await prisma.contact
      .findMany({
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
      })
      .then((contacts) => {
        if (contacts.length === 0) {
          return emptyDataResponse;
        }

        const cursor = contacts[contacts.length - 1].id;
        return {
          contacts,
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
