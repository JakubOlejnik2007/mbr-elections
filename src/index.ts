import express, { Request, Response } from 'express';
import path from 'path';
import { config } from './config';
import MySQLDatabase from './db_connection';

import cors from 'cors';
import sendEmail from './sendEmail';

const app = express();
const port = config.http.port;

app.use(express.static(path.join(__dirname, '../static/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/vote', async (req: Request, res: Response) => {
    const configDB = config.mysql;

    try {
        const DATABASE = new MySQLDatabase(configDB);
        await DATABASE.connect();

        const { olejnik, krol, wojtynska, identifier } = req.body;
        const query = `UPDATE Votes SET olejnik = ?, krol = ?, wojtynska = ? WHERE ID = ?`;
        const values = [Number(olejnik), Number(krol), Number(wojtynska), identifier];
        if (await checkIfIdentifierExists(DATABASE, identifier)) {
            await DATABASE.query(query, values);

            res.sendStatus(200);
        }
        else res.sendStatus(403);
        await DATABASE.disconnect();
    } catch (error) {
        console.error(error);
        res.sendStatus(503);
    }
});



app.get('/result', async (req: Request, res: Response) => {
    const configDB = config.mysql;

    try {
        const DATABASE = new MySQLDatabase(configDB);
        await DATABASE.connect();

        const query = `SELECT
            sum(olejnik) as olejnik,
            sum(krol) as krol,
            sum(wojtynska) as wojtynska
            FROM Votes;`;
        const result = await DATABASE.query(query);

        if (result.length > 0) {
            const { olejnik, krol, wojtynska } = result[0];
            await sendEmail({
                to: "mbr@lo1radzymin.edu.pl",
                subject: "Wyniki wyborów",
                message: `<html><head><style>table, tr, td {border: 2px solid #000; border-collapse: collapse; text-align: center; margin: 0 auto; padding: 15px;} h1, p {text-align: center;}</style></head><body><h1>Wyniki wyborów</h1><p>Wynik wygenerowano: ${(new Date()).toLocaleString("pl")}</p><table><tr><td>Jakub Olejnik</td><td>Karol Król</td><td>Julia Wojtyńska</td></tr><tr><td>${olejnik}</td><td>${krol}</td><td>${wojtynska}</td></tr></table><body></html>`
            })
            res.status(200).json({ olejnik, krol, wojtynska });
        } else {
            res.sendStatus(404);
        }

        await DATABASE.disconnect();
    } catch (error) {
        console.error(error);
        res.sendStatus(503);
    }
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

const checkIfIdentifierExists = async (DATABASE: MySQLDatabase, identifier: string): Promise<boolean> => {
    try {
        const query = `SELECT COUNT(*) AS count FROM Votes WHERE ID = ?`;
        const [rows] = await DATABASE.query(query, [identifier]);
        console.log(rows)
        if (rows.count > 0) {
            return true;
        }
    } catch (error) {
        console.error("Error while checking identifier:", error);
    }
    return false;
}
