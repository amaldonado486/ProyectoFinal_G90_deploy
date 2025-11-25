import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
  connectionString: process.env.DB_URL,

  ssl: {
    rejectUnauthorized: false
  }
});