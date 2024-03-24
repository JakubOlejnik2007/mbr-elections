export interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  message: string;
}