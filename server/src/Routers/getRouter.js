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

		res.status(200).json({ items: items.rows });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});

router.get("/events", verifyAuthorization, async (req, res) => {
	try {
		const getEvents = `
      SELECT * FROM event
    `;

		const events = await db.query(getEvents);

		console.log(events.rows);

		res.status(200).json({ events: events.rows });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});


router.get("/lb", verifyAuthorization, async (req, res) => {

  console.log(req.uid);

  try {
    
		const userAndPoint = await db.query(
			`
      WITH ranked_users AS (
        SELECT "id", "name", "point", ROW_NUMBER() OVER (ORDER BY "point" DESC) AS position
        FROM "user"
      )
      SELECT "id", "name", "point", 
            CASE 
              WHEN position <= 10 THEN position  -- For users in the top 10, show their rank
              WHEN "id" = $1 THEN position      -- If it's the current user, show their actual rank
              ELSE 10                          -- For others, show as 10
            END AS position
      FROM ranked_users
      WHERE position <= 10 OR "id" = $1   -- Include the user even if they're not in the top 10
      ORDER BY position;`,
			[req.uid]
		);



    res.status(200).json({ users: userAndPoint.rows });

    console.log(userAndPoint.rows);

    
  } catch (error) {
		console.error("Error getting user and point: ", error.message);
		throw error; 
  }


});

