import express from "express";
import { createServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

async function startServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: resolve(__dirname, "../client"),
  });

  app.use(vite.middlewares);

  const { default: routes } = await import("./routes.js");
  app.use(routes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
