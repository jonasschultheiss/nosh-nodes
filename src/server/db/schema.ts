// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  boolean,
  float,
  mysqlTableCreator,
  timestamp,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `nosh-nodes_${name}`);

export const subjects = mysqlTable("subjects", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  // name: varchar("name", { length: 256 }),
  // createdAt: timestamp("created_at")
  //   .default(sql`CURRENT_TIMESTAMP`)
  //   .notNull(),
  art: float("art"),
  sports: float("sports"),
  politics: float("politics"),
  books: float("books"),
  multimedia: float("multimedia"),
  technology: float("technology"),
  fashion: float("fashion"),
  outdoorActivities: float("outdoorActivities"),

  hasPet: boolean("hasPet"),
  hasChildren: boolean("hasChildren"),

  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
