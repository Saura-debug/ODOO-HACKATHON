import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
import { prisma } from "./config/prisma";



console.log("everything is working fine");
app.get("/health", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      database: "Connected ✅",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: "Disconnected ❌",
    });
  }
});

export default app;
