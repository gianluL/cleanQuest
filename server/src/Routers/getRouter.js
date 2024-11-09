import express from "express";
import verifyAuthorization from "../middleware/Authenticator.js";
import { pool as db } from "../DB/db.js";

const router = express.Router();

export default router;

router.get("/items", verifyAuthorization, async (req, res) => {
	try {
		const getItems = `
      SELECT * FROM item
      `;


		const items = await db.query(getItems);

    console.log(items.rows);

		res.status(200).json({items: items.rows});
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});
