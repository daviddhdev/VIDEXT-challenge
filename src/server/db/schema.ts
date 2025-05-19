import { sql } from "drizzle-orm";
import {
  index,
  sqliteTableCreator,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `tldraw_${name}`);

export const documents = createTable(
  "document",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }).notNull(),
    content: d.text().notNull(), // tldraw document state as JSON
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("name_idx").on(t.name),
    uniqueIndex("name_unique_idx").on(t.name),
  ]
);
