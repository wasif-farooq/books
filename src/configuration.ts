import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
    db: process.env.DATABASE_URL,
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
}));