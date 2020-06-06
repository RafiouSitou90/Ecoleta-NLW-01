import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    APP_PORT: process.env.APP_PORT || 3333,
    APP_SERVER: process.env.APP_SERVER || 'http://localhost',
    APP_SECRET: process.env.APP_SECRET || 'APP_SECRET_KEY'
};

export default config;
