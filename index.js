import express from "express";
import router from "./routes/memeRoutes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/memes", router);

app.post("/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: "regular",
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error("Error! Something broke:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
