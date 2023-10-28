// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  boolean,
  int,
  mysqlTableCreator,
  text,
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
  userId: text("userId").notNull().primaryKey(),
  art: int("art").default(1).notNull(),
  sports: int("sports").default(1).notNull(),
  politics: int("politics").default(1).notNull(),
  books: int("books").default(1).notNull(),
  multimedia: int("multimedia").default(1).notNull(),
  technology: int("technology").default(1).notNull(),
  fashion: int("fashion").default(1).notNull(),
  outdoorActivities: int("outdoorActivities").default(1).notNull(),

  hasPet: boolean("hasPet").default(false).notNull(),
  hasChildren: boolean("hasChildren").default(false).notNull(),

  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const mood = mysqlTable("mood", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  userId: text("userId"),
  moodLevel: int("moodLevel").default(1).notNull(),
  socialBatteryLevel: int("socialBatteryLevel").default(1).notNull(),
  stressLevel: int("stressLevel").default(1).notNull(),
  integrationLevel: int("integrationLevel").default(1).notNull(),
  ready: boolean("hasPet").default(false).notNull(),

  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
