import { spawn, type ChildProcess } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Поднимает `server/index.mjs` вместе с Vite, чтобы `/api` не получал ECONNREFUSED. */
function mealsyApiDevPlugin(): Plugin {
  let child: ChildProcess | null = null;

  function killChild() {
    if (!child?.pid) return;
    try {
      child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
    child = null;
  }

  return {
    name: "mealsy-api-dev",
    configureServer() {
      if (process.env.MEALSY_SKIP_API === "1") {
        return;
      }

      const script = path.join(__dirname, "server", "index.mjs");
      child = spawn(process.execPath, [script], {
        cwd: __dirname,
        stdio: "inherit",
        env: { ...process.env },
      });

      child.on("error", (err) => {
        console.error("[mealsy-api] не удалось запустить API:", err.message);
      });

      process.once("exit", killChild);
      process.once("SIGINT", killChild);
      process.once("SIGTERM", killChild);
    },
    closeBundle() {
      killChild();
    },
  };
}

export default defineConfig({
  plugins: [react(), mealsyApiDevPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
