import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
router.post("/:id/like", authenticate, async (req, res) => {
  const memeId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const meme = await prisma.meme.findUnique({ where: { id: memeId } });
    if (!meme) return res.status(404).json({ error: "Meme not found" });

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_memeId: { userId, memeId },
      },
    });
    if (existingLike) {
      return res.status(400).json({ error: "Already liked" });
    }

    const like = await prisma.like.create({
      data: { userId, memeId },
    });

    res.status(201).json(like);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like meme" });
  }
});
router.post("/:id/unlike", authenticate, async (req, res) => {
  const memeId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const like = await prisma.like.findUnique({
      where: { userId_memeId: { userId, memeId } },
    });
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    await prisma.like.delete({
      where: { userId_memeId: { userId, memeId } },
    });

    res.json({ message: "Unliked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unlike meme" });
  }
});
export default router;