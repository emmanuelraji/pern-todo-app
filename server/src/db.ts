import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});
