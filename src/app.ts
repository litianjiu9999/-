import express, { type Express, type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, "..", "public");

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/hello", (req: Request, res: Response) => {
    const rawName = req.query.name;
    const name = typeof rawName === "string" && rawName.trim() !== "" ? rawName.trim() : "World";
    res.json({ message: `Hello, ${name}!` });
  });

  app.post("/api/echo", (req: Request, res: Response) => {
    res.json({ youSent: req.body ?? null });
  });

  app.use(express.static(publicDir));

  return app;
}
