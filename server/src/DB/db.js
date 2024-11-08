import pg from "pg";

const env = process.env;

const client = new pg.Client({
	host: env.DB_HOST,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	port: env.DB_PORT,
	database: env.DB_DATABASE,
});



export default client;
