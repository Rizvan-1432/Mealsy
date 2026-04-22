import { FormEvent } from "react";
import "./Footer.css";

function ClocheIcon() {
  return (
    <svg className="footer__logo-cloche-svg" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path
        d="M7 0C4.5 0 2.5 1.2 1.5 3h11C11.5 1.2 9.5 0 7 0ZM1 4v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4H1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="footer__social-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 5L3 12.5l5.5 1.5L18 8l-8.5 7.5.5 4L12 15l4 2.5L21 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialSquareIcon() {
  return (
    <svg className="footer__social-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function Footer() {
  function handleFooterSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__col--logo">
          <a className="footer__logo" href="/">
            me
            <span className="footer__logo-a">
              <span className="footer__logo-cloche" aria-hidden="true">
                <ClocheIcon />
              </span>
              a
            </span>
            lsy
          </a>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Присоединяйтесь</h2>
          <p className="footer__label">Наши социальные сети:</p>
          <div className="footer__socials">
            <a className="footer__social-link" href="https://t.me/mealsy" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <TelegramIcon />
            </a>
            <a className="footer__social-link" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="Социальная сеть">
              <SocialSquareIcon />
            </a>
          </div>
          <p className="footer__label footer__label--spaced">Подпишитесь на рассылку:</p>
          <form className="footer__form" onSubmit={handleFooterSubscribe}>
            <input className="footer__input" type="email" name="footer-email" placeholder="Ваш Email" autoComplete="email" />
            <button className="footer__submit" type="submit">
              Подписаться
            </button>
          </form>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Находите</h2>
          <nav className="footer__nav" aria-label="Навигация в подвале">
            <a className="footer__link" href="/">
              Главная
            </a>
            <a className="footer__link" href="/recipes">
              Рецепты
            </a>
            <a className="footer__link" href="/catalog-recipes">
              Каталог рецептов
            </a>
            <a className="footer__link" href="/spravochnik">
              Справочник
            </a>
            <a className="footer__link" href="/profile">
              Мой профиль
            </a>
          </nav>
        </div>

        <div className="footer__col footer__col--last">
          <h2 className="footer__heading">Обратная связь</h2>
          <p className="footer__text">
            Помогите нам стать лучше! Оставьте свои пожелания по улучшению сервиса. Мы стараемся для вас!
          </p>
          <a className="footer__feedback-link" href="mailto:support@mealsy.ru">
            Напишите нам
          </a>
        </div>
      </div>
    </footer>
  );
}
