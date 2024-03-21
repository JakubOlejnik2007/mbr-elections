import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../.env')});

const {DB_NAME, DB_HOST, DB_USER, DB_PASS, HTTP_PORT} = process.env

type Config = {
    http: {
        port: number,
    },
    mysql: {
        host: string,
        name: string,
        user: string,
        password: string
    }
}


export const config: Config = {
    http: {
        port: Number(HTTP_PORT) || 80
    },
    mysql: {
        host: String(DB_HOST) || 'localhost',
        name: String(DB_NAME) || 'elections',
        user: String(DB_USER) || 'root',
        password: String(DB_PASS) || ''
    }
}