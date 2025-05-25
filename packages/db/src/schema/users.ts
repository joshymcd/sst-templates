import { sql } from "drizzle-orm";
import { text, integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  profile_image_url: text("profile_image_url"),
});
