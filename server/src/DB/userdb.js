import { pool } from "./db.js";

export async function createUser(user) {

  try {


    const insertUser = await pool.query(
      `INSERT INTO "user" ("name",surname,email,password, "point", isOrganizer) 
            VALUES ($1,$2,$3,$4,$5,$6)`,
      [user.name, user.surname, user.email, user.password, user.point, user.isOrganizer]
    );


  } catch (error) {
    console.error("Error creating user: ", error.message);
    throw error;
  }
}

export async function editUser(id ,user) {
  try {
    console.log(user);
    const insertUser = await pool.query(
      `UPDATE "user" SET name = $1, surname = $2, email = $3, point = $4 
            WHERE id = $5`,
      [user.name, user.surname, user.email, user.point, id]
    );


  } catch (error) {
    console.error("Error updating user: ", error.message);
    throw error;
  }
}

export async function getUser(id) {
  try {
    await pool.query("BEGIN");

    const user = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [
      id,
    ]);

    await pool.query("COMMIT");
    return user.rows[0];

  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error getting user: ", error.message);
    throw error;
  }
}

export async function delUser(id) {
  try {
    await pool.query("BEGIN");

    const user = await pool.query(`DELETE FROM "user" WHERE id = $1`, [
      id,
    ]);

    await pool.query("COMMIT");

  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting user: ", error.message);
    throw error;
  }
}

export async function getUserAndPoint(){
  try {
    await pool.query("BEGIN");

    const userAndPoint = await pool.query(`SELECT "name", "point" FROM "user"`);
    await pool.query("COMMIT");
    return userAndPoint.rows;

  }catch {
    await pool.query("ROLLBACK");
    console.error("Error getting user and point: ", error.message);
  }
}