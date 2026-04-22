/**
 * Простой API для локальной разработки: регистрация и вход.
 * Запуск: npm run server
 * Данные: server/data/users.json (создаётся автоматически)
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const DATA_FILE = path.join(__dirname, "data", "users.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function readUsers() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
  } catch {
    return false;
  }
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...corsHeaders(),
  });
  res.end(JSON.stringify(data));
}

function sendOptions(res) {
  res.writeHead(204, {
    ...corsHeaders(),
    "Access-Control-Max-Age": "86400",
  });
  res.end();
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `localhost:${PORT}`;
  let pathname = "/";
  try {
    pathname = new URL(req.url || "/", `http://${host}`).pathname;
  } catch {
    pathname = "/";
  }

  if (req.method === "OPTIONS") {
    sendOptions(res);
    return;
  }

  try {
    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && pathname === "/api/register") {
      const body = await parseJsonBody(req);
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      const passwordRepeat = typeof body.passwordRepeat === "string" ? body.passwordRepeat : "";

      if (!name || !email || !password) {
        sendJson(res, 400, { ok: false, error: "Заполните все обязательные поля" });
        return;
      }
      if (password !== passwordRepeat) {
        sendJson(res, 400, { ok: false, error: "Пароли не совпадают" });
        return;
      }
      if (password.length < 8) {
        sendJson(res, 400, { ok: false, error: "Пароль должен содержать не менее 8 символов" });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        sendJson(res, 400, { ok: false, error: "Укажите корректный email" });
        return;
      }

      const users = readUsers();
      if (users.some((u) => u.email === email)) {
        sendJson(res, 409, { ok: false, error: "Пользователь с таким email уже зарегистрирован" });
        return;
      }

      const { salt, hash } = hashPassword(password);
      users.push({
        id: crypto.randomUUID(),
        name,
        email,
        salt,
        passwordHash: hash,
        createdAt: new Date().toISOString(),
      });
      writeUsers(users);

      sendJson(res, 201, {
        ok: true,
        message: "Регистрация прошла успешно",
        user: { name, email },
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/login") {
      const body = await parseJsonBody(req);
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";

      if (!email || !password) {
        sendJson(res, 400, { ok: false, error: "Укажите email и пароль" });
        return;
      }

      const users = readUsers();
      const user = users.find((u) => u.email === email);
      if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
        sendJson(res, 401, { ok: false, error: "Неверный email или пароль" });
        return;
      }

      sendJson(res, 200, {
        ok: true,
        message: "Вход выполнен",
        user: { name: user.name, email: user.email },
      });
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found" });
  } catch (err) {
    if (err?.message === "Payload too large") {
      sendJson(res, 413, { ok: false, error: "Слишком большой запрос" });
      return;
    }
    sendJson(res, 400, { ok: false, error: "Некорректные данные запроса" });
  }
});

server.listen(PORT, () => {
  console.log(`Mealsy API: http://localhost:${PORT} (POST /api/register, /api/login)`);
});
