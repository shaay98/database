import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

interface MemeCreateRequestBody {
  title: string;
  imageUrl: string;
  creatorId: number;
}

interface MemeCreateResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

router.post(
  "/",
  async (
    req: Request<unknown, MemeCreateResponse | ErrorResponse, MemeCreateRequestBody>,
    res: Response<MemeCreateResponse | ErrorResponse>
  ) => {
    try {
      const { title, imageUrl, creatorId } = req.body;

      if (!title || !imageUrl || !creatorId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const meme = await prisma.meme.create({
        data: {
          title,
          imageUrl,
          creatorId,
        },
      });

      res.status(201).json({
        message: "Meme created successfully"
      });
    } catch (error) {
      console.error("Error creating meme:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;