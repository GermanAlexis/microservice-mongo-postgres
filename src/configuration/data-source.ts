import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot();
const configService = new ConfigService();

const dataSource = new DataSource({
  url: configService.get('DB_CONNECTION_STRING')!,
  type: 'postgres',
  //   namingStrategy: new SnakeNamingStrategy(), load table camelCase
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  migrations: ['migrations/*.js'],
});

export default dataSource;
