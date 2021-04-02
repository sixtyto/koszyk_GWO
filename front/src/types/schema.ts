/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/book": {
    get: {
      parameters: {
        query: {
          /** Page */
          page?: number;
          /** Search by title (like) */
          "search[title]"?: string;
          /** Search by authors (like) */
          "search[author]"?: string;
        };
      };
      responses: {
        /** List of books */
        200: {
          content: {
            "application/json": {
              data?: components["schemas"]["Book"][];
            };
          };
        };
      };
    };
  };
  "/book/{book_id}": {
    get: {
      parameters: {
        path: {
          /** Book ID */
          book_id: number;
        };
      };
      responses: {
        /** Single book */
        200: {
          content: {
            "application/json": {
              data?: components["schemas"]["Book"];
            };
          };
        };
        404: components["responses"]["not-found-error"];
      };
    };
    parameters: {
      path: {
        /** Book ID */
        book_id: number;
      };
    };
  };
  "/order": {
    post: {
      responses: {
        /** Fake store */
        201: {
          content: {
            "application/json": {
              data?: {
                new_teacher?: boolean;
                ordered_materials?: boolean;
              };
            };
          };
        };
        422: components["responses"]["form-validation-error"];
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["Order"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    Book: {
      /** Book ID */
      id: number;
      /** Book title */
      title: string;
      /** Book authors comma separated */
      author: string;
      /** Full path to image with cover */
      cover_url: string;
      /** Count of pages in book */
      pages: number;
      /** Book price set in cents */
      price: number;
      /** Currency codename (ISO 4217) */
      currency: string;
    };
    Order: {
      order: components["schemas"]["OrderElement"][];
      /** First name */
      first_name: string;
      /** Last name */
      last_name: string;
      /** City */
      city: string;
      /** Zip code (00-000 format) */
      zip_code: string;
    };
    OrderElement: {
      /** Book ID */
      id: number;
      /** Quantity */
      quantity: number;
    };
  };
  responses: {
    /** Request have validation errors */
    "form-validation-error": {
      content: {
        "application/json": {
          error?: {
            message?: string;
            violations?: {
              _field_name_?: string[];
            };
          };
        };
      };
    };
    /** Record was not found */
    "not-found-error": {
      content: {
        "application/json": {
          error?: {
            message?: string;
          };
        };
      };
    };
  };
}
