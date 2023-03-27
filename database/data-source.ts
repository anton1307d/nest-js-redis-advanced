import {DataSource, DataSourceOptions} from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {Post} from "../src/post/enities/post.entity";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [Post],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    // synchronize: true
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
