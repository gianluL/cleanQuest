import express from "express";
import cors from "cors";

import authRouter from "./Routers/authRouter.js";

import dotenv from "dotenv";
dotenv.config();

const server = express();

const PORT = process.env.SERVER_PORT || 3001;




server.use(cors());
server.use(express.json());
server.use(authRouter);







server.listen(PORT, () => {
  console.log(`hosting on http://localhost:${PORT}`)
});


