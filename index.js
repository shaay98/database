import express, { request, response } from "express";
import router from "./routes/memeRoutes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/memes", router);
app.post("/auth/register", async (request,response,next) => {
    const {username, password} = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create ({
        data: {
            username: user,
            password: hashedPassword,
        }
    })
    response.status(201).json(user);
})
 app.post("/auth/login", async (request,response) => {
    const {username,password} = request.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username;
        }
    })
    if (!user) {
        return response.status(401).json({error: "Wrong password, Please try again"});
    }
    const token = jwt.sign({
        userId:user.userId,
        role:"regular",
    }
    "secret", {expiresIn: "1hr"}
);
response.json({token});
 });

 app.use((request,response,next) => {
    response.status(404).json({

    });
 });

 app.use((error, request,response,next) => {
    console.log("Error! Something Broke", error.stack);
    
 })