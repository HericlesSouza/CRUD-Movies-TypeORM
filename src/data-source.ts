import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath = path.join(__dirname, "./migrations/**.{ts,js}");

    const dbURL = process.env.DATABASE_URL;

    if (!dbURL) {
        throw new Error("Env var DATABASE_URL does not exists");
    }

    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "test") {
        return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath]
        };  
    }

    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        type: "postgres",
        url: dbURL,
        synchronize: false,
        logging: true,
        migrations: [migrationsPath],
        entities: [entitiesPath]
    };


};

const AppDataSource = new DataSource(dataSourceConfig());

export {
    AppDataSource
};