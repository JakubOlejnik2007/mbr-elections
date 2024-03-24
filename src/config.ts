import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../.env')});

const {DB_DATABASE, DB_HOST, DB_USER, DB_PASS, HTTP_PORT, MAIL_SERVICE, MAIL_USER, MAIL_PASS} = process.env

type Config = {
    http: {
        port: number,
    },
    mysql: {
        host: string,
        database: string,
        user: string,
        password: string
    },
    mail: {
        service: string,
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
        database: String(DB_DATABASE) || 'elections',
        user: String(DB_USER) || 'root',
        password: String(DB_PASS) || ''
    },
    mail: {
        service: String(MAIL_SERVICE),
        user: String(MAIL_USER),
        password: String(MAIL_PASS)
    }
}