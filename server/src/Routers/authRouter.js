import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {

  console.log('logged')
	res.send("login");
});


authRouter.post("/register", (req, res) => {
	res.send("register");
});


export default authRouter;
