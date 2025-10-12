import { request } from "express";
import {memes} from "../model/memeData.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export const getAllMemes = async (request,response) => {
getMemeById = async (request, response)
};
 
export const addMeme = async (request,response) => {
   const {title, URL, userId} = request.body;
    const {title, URL} = request.body;
    
    if (!title || !URL) {
        throw new Error ("URL and title are required");
        };
       
        newMeme = await prisma.meme.create({ 
         title, URL, userId: request.user.userId
        });
        
