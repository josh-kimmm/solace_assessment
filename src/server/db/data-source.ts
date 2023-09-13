import "reflect-metadata"
import { DataSource } from "typeorm"
import Note from "./entity/Note"
import { readFileSync } from "node:fs"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


const { DB_HOST, DB_PORT, DB_USER_NAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;
console.log(`DB_USERNAME: ${DB_USER_NAME}`);
console.log(`NODE_ENV: ${NODE_ENV}`);

const ssl = NODE_ENV === "development" || NODE_ENV === "production" ? {
    rejectUnauthorized: false,
    ca: readFileSync(`/tmp/rds-ca.pem`).toString()
  } : undefined;

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USER_NAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Note],
  migrations: ["./migrations/*"],
  migrationsTableName: "__db_migrations",
  logging: false,
  ssl
};

const AppDataSource = new DataSource(config);

export default AppDataSource;