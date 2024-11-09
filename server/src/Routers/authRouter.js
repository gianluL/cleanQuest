
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {pool as db} from "../DB/db.js";


const router = express.Router();


export default router;


const salt = 10;

router.post("/login", async (req, res) => {
	const { email, password } = req.body;


	try {
		const users = await db.query(`
      SELECT * FROM "user" 
      WHERE email = $1
      `, [email]);

      console.log(req.body);
		if (users.rows.length != 1)
			return res
				.status(401)
				.json({ error: "We could not find any user with that username" });

		const user = users.rows[0];
		const hashedPassword = user.password;

		const arePasswordsMatching = await bcrypt.compare(password, hashedPassword);

		if (!arePasswordsMatching) {
			return res
				.status(401)
				.json({ error: "Make sure to enter everything correctly" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);

		res.status(200).json({ uid: user.id, token: token });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});

router.post("/register", async (req, res) => {
	const { email, name, surname, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, salt);

  console.log(req.body);

	try {
		const insertUserQuery = `
      INSERT INTO "user"
      (name, surname, email, password)
      VALUES
      ($1, $2, $3, $4)
    `;

    console.log(insertUserQuery);

		await db.query(insertUserQuery, [name, surname, email, hashedPassword]);

		res.status(200).json({ message: "Registered successfully" });
	} catch (error) {
		console.log(error);

		res.status(500).json({ error: "Something went wrong" });
	}
});
