import { FormEvent, useState } from "react";
import { setSessionUser } from "../../auth/session";
import "./LoginPage.css";

export function LoginPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        user?: { name: string; email: string };
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Не удалось войти");
        return;
      }

      if (data.user) {
        setSessionUser({ name: data.user.name, email: data.user.email });
      }

      setStatus("success");
      setMessage(data.message ?? "Вход выполнен");
      window.setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch {
      setStatus("error");
      setMessage(
        "Сервер API недоступен (порт 3001). Запустите `npm run dev` из папки Mealsy (не из server/) — API стартует сам, либо в отдельном терминале: `npm run server`."
      );
    }
  }

  return (
    <section className="login-page" aria-labelledby="login-page-title">
      <div className="login-page__card">
        <h1 className="login-page__title" id="login-page-title">
          Вход в Mealsy
        </h1>
        <p className="login-page__text">Войдите в аккаунт, чтобы сохранять рецепты и подборки.</p>

        {message ? (
          <p
            className={`login-page__banner${status === "error" ? " login-page__banner--error" : ""}${
              status === "success" ? " login-page__banner--success" : ""
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}

        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="login-page__field">
            <span>Email</span>
            <input type="email" name="email" placeholder="Ваш Email" autoComplete="email" required disabled={status === "loading"} />
          </label>
          <label className="login-page__field">
            <span>Пароль</span>
            <input type="password" name="password" placeholder="Введите пароль" autoComplete="current-password" required disabled={status === "loading"} />
          </label>
          <button className="login-page__submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Вход…" : "Войти"}
          </button>
        </form>

        <p className="login-page__hint">
          Нет аккаунта?{" "}
          <a href="/register" className="login-page__link">
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </section>
  );
}
