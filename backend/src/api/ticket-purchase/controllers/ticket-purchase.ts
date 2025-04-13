import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::ticket-purchase.ticket-purchase",
  ({ strapi }) => ({
    // This preserves all the default controller methods

    // Add custom method to update by reference number
    async updateByReference(ctx) {
      try {
        const { referenceNumber } = ctx.params;
        const { data } = ctx.request.body;

        if (!referenceNumber) {
          return ctx.badRequest("Reference number is required");
        }

        if (!data) {
          return ctx.badRequest("Request body should contain a data object");
        }

        // Find the ticket purchase by reference number
        const entities = await strapi.entityService.findMany(
          "api::ticket-purchase.ticket-purchase",
          {
            filters: { referenceNumber },
          }
        );

        if (!entities || entities.length === 0) {
          return ctx.notFound(
            `No ticket purchase found with reference number: ${referenceNumber}`
          );
        }

        if (entities.length > 1) {
          return ctx.badRequest(
            `Multiple ticket purchases found with reference number: ${referenceNumber}`
          );
        }

        const entity = entities[0];

        // Update the ticket purchase using the current ID in the database
        const updatedEntity = await strapi.entityService.update(
          "api::ticket-purchase.ticket-purchase",
          entity.id,
          { data }
        );

        // Return the updated entity
        return this.transformResponse(updatedEntity);
      } catch (error) {
        strapi.log.error("Error updating ticket purchase by reference:", error);
        return ctx.internalServerError(
          `Internal Server Error: ${error.message}`
        );
      }
    },
  })
);
