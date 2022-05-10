import dotenv from "dotenv";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

console.log(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  process.env.HOST,
  process.env.PORT
);

export default {
  client: "pg",
  connection: {
    database: process.env.DATABASE,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    insecureAuth: true,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.join(__dirname, "./db/migrations"),
    extension: 'mjs',
    loadExtensions: ['.mjs']
  },
  seeds: {
    directory: path.join(__dirname, "./db/seeds")
  }
};
