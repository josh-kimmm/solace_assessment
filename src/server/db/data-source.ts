import "reflect-metadata"
import { DataSource } from "typeorm"
import Note from "./entity/Note"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "asdQWE1!",
    database: "solace",
    entities: [Note],
    migrations: ["./migrations/*"],
    migrationsTableName: "__db_migrations",
    logging: true,
});

export default AppDataSource;