import { paths, components } from "./schema";

export type BookResponse = paths["/book"]["get"]["responses"]["200"]["content"]["application/json"];
export type BooksType = components["schemas"]["Book"][];
export type OrderType = components["schemas"]["Order"];
