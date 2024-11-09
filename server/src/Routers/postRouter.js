
import express from "express";
import verifyAuthorization from "../middleware/Authenticator.js"
import {pool as db} from "../DB/db.js";


const router = express.Router();


export default router;

// CREATE TABLE item (
// 	id serial PRIMARY KEY,
// 	name varchar(100),
// 	description text,
//   lat FLOAT NOT NULL,
// 	lng FLOAT NOT NULL,
// 	point int,
// 	isCollected TEXT DEFAULT NULL,
// 	img text,
// 	reporter int REFERENCES "user"(id),
// 	collector int REFERENCES "user"(id)
// );

router.post('/report-item', verifyAuthorization, async (req, res) => {
  const {name, description, lat, lng, point} = req.body;

  console.log(req.body);
  console.log(req.uid);


  try {

    const reportQuery = `
      INSERT INTO item (name, description, lat, lng, point, reporter)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(reportQuery, [name, description, lat, lng, point, req.uid]);

    res.status(200).json({message: "Item reported successfully"});

  } catch (error) {
    res.status(500).json({error: "Something went wrong"});
  }
});


router.post('/collect-item', verifyAuthorization, async (req, res) => {

  console.log(req.body);
  res.status(200).json({message: "Item collected successfully"});


  try {
    const {id} = req.body;

    const collectedDate = new Date().toISOString();

    const collectQuery = `
      UPDATE item
      SET isCollected = $1, collector = $2
      WHERE id = $3
    `;

    await db.query(collectQuery, [collectedDate, req.uid, id]);

    const getPointQuery = `
      SELECT point
      FROM item
      WHERE id = $1
    `;



    const point = await db.query(getPointQuery, [id]);

    const updatePointQuery = `
      UPDATE "user"
      SET point = point + $1
      WHERE id = $2
    `;

    await db.query(updatePointQuery, [point.rows[0].point, req.uid]);

    res.status(200).json({message: "Item collected successfully"});
  } catch (error) {
    
  }


});


router.post('/add-event', verifyAuthorization, async (req, res) => {
  const { title, description, lat, lng, date, participantPoint } = req.body;

  console.log(req.body);
  
  try {
    
    const addEventQuery = `
    INSERT INTO event (title, description, lat, lng, date, participantPoint, "user")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    // console.log(req.body);
    // console.log(req.uid);
    
    await db.query(addEventQuery, [title, description, lat, lng, date, participantPoint, req.uid]);
    
    res.status(200).json({message: "Event added successfully"});
  } catch (error) {
    
  }


});