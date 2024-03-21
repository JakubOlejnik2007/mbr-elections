import mysql, { Connection, FieldInfo, MysqlError } from 'mysql';
import { DBConfig } from './interfaces';

class MySQLDatabase {
    private connection: Connection;
  
    constructor(private config: DBConfig) {
      this.connection = mysql.createConnection(config);
    }
  
    connect(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.connection.connect((error: MysqlError) => {
          if (error) {
            console.error('Błąd połączenia z bazą danych:', error);
            reject(error);
          } else {
            console.log('Połączono z bazą danych MySQL');
            resolve();
          }
        });
      });
    }
  
    disconnect(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.connection.end((error?: MysqlError) => {
          if (error) {
            console.error('Błąd rozłączania z bazą danych:', error);
            reject(error);
          } else {
            console.log('Rozłączono z bazą danych MySQL');
            resolve();
          }
        });
      });
    }
  
    query(sql: string, args?: any[]): Promise<any> {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, args, (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
          if (error) {
            console.error('Błąd zapytania do bazy danych:', error);
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    }
  }
  
  export default MySQLDatabase;
  