import { FormEvent } from "react";
import "./LoginPage.css";

export function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="login-page" aria-labelledby="login-page-title">
      <div className="login-page__card">
        <h1 className="login-page__title" id="login-page-title">
          Вход в Mealsy
        </h1>
        <p className="login-page__text">Войдите в аккаунт, чтобы сохранять рецепты и подборки.</p>

        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="login-page__field">
            <span>Email</span>
            <input type="email" name="email" placeholder="Ваш Email" autoComplete="email" required />
          </label>
          <label className="login-page__field">
            <span>Пароль</span>
            <input type="password" name="password" placeholder="Введите пароль" autoComplete="current-password" required />
          </label>
          <button className="login-page__submit" type="submit">
            Войти
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
