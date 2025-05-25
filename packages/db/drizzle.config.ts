import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: Resource.PostgresUrl.value,
    ssl: true,
  },
});
