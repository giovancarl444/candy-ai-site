import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** File metadata only. Actual bytes are kept in managed object storage. */
export const storedFiles = mysqlTable(
  "stored_files",
  {
    id: int("id").autoincrement().primaryKey(),
    ownerId: int("ownerId").notNull().references(() => users.id),
    originalName: varchar("originalName", { length: 255 }).notNull(),
    contentType: varchar("contentType", { length: 120 }).notNull(),
    sizeBytes: int("sizeBytes").notNull(),
    storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
    storageUrl: varchar("storageUrl", { length: 768 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    ownerCreatedIndex: index("stored_files_owner_created_idx").on(table.ownerId, table.createdAt),
  }),
);

export type StoredFile = typeof storedFiles.$inferSelect;
export type InsertStoredFile = typeof storedFiles.$inferInsert;
