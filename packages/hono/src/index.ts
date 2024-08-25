import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono().get("/", async (c) => {
  return c.text("hello world");
});

export const handler = handle(app);
