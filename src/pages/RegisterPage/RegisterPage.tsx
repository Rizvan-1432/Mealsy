import { FormEvent, useState } from "react";
import { setSessionUser } from "../../auth/session";
import "./RegisterPage.css";

export function RegisterPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const passwordRepeat = String(fd.get("password-repeat") ?? "");

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordRepeat }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        user?: { name: string; email: string };
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Не удалось зарегистрироваться");
        return;
      }

      if (data.user) {
        setSessionUser({ name: data.user.name, email: data.user.email });
      }

      setStatus("success");
      setMessage(data.message ?? "Регистрация прошла успешно");
      form.reset();
      window.setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch {
      setStatus("error");
      setMessage(
        "Сервер API недоступен (порт 3001). Запустите `npm run dev` из папки Mealsy (не из server/) — API стартует сам, либо в отдельном терминале: `npm run server`."
      );
    }
  }

  return (
    <section className="register-page" aria-labelledby="register-page-title">
      <div className="register-page__card">
        <h1 className="register-page__title" id="register-page-title">
          Зарегистрируйтесь
        </h1>
        <p className="register-page__text">Создайте аккаунт, чтобы сохранять рецепты, избранное и личные подборки.</p>

        {message ? (
          <p
            className={`register-page__banner${status === "error" ? " register-page__banner--error" : ""}${
              status === "success" ? " register-page__banner--success" : ""
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}

        <form className="register-page__form" onSubmit={handleSubmit}>
          <label className="register-page__field">
            <span>Имя</span>
            <input type="text" name="name" placeholder="Ваше имя" autoComplete="name" required disabled={status === "loading"} />
          </label>
          <label className="register-page__field">
            <span>Email</span>
            <input type="email" name="email" placeholder="Ваш Email" autoComplete="email" required disabled={status === "loading"} />
          </label>
          <label className="register-page__field">
            <span>Пароль</span>
            <input type="password" name="password" placeholder="Придумайте пароль" autoComplete="new-password" required disabled={status === "loading"} />
          </label>
          <label className="register-page__field">
            <span>Повторите пароль</span>
            <input type="password" name="password-repeat" placeholder="Повторите пароль" autoComplete="new-password" required disabled={status === "loading"} />
          </label>
          <button className="register-page__submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Отправка…" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="register-page__hint">
          Уже есть аккаунт?{" "}
          <a href="/login" className="register-page__link">
            Войдите
          </a>
        </p>
      </div>
    </section>
  );
}
