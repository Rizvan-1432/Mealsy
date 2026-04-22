import { FormEvent } from "react";
import "./RegisterPage.css";

export function RegisterPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="register-page" aria-labelledby="register-page-title">
      <div className="register-page__card">
        <h1 className="register-page__title" id="register-page-title">
          Зарегистрируйтесь
        </h1>
        <p className="register-page__text">Создайте аккаунт, чтобы сохранять рецепты, избранное и личные подборки.</p>

        <form className="register-page__form" onSubmit={handleSubmit}>
          <label className="register-page__field">
            <span>Имя</span>
            <input type="text" name="name" placeholder="Ваше имя" autoComplete="name" required />
          </label>
          <label className="register-page__field">
            <span>Email</span>
            <input type="email" name="email" placeholder="Ваш Email" autoComplete="email" required />
          </label>
          <label className="register-page__field">
            <span>Пароль</span>
            <input type="password" name="password" placeholder="Придумайте пароль" autoComplete="new-password" required />
          </label>
          <label className="register-page__field">
            <span>Повторите пароль</span>
            <input type="password" name="password-repeat" placeholder="Повторите пароль" autoComplete="new-password" required />
          </label>
          <button className="register-page__submit" type="submit">
            Зарегистрироваться
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
