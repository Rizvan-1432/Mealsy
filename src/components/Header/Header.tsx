import { useEffect, useRef, useState } from "react";
import weekRecipeImg from "../../../assets/img/image_8.png";
import { clearSessionUser, getSessionUser, SESSION_STORAGE_KEY } from "../../auth/session";
import "./Header.css";

function SearchIcon() {
  return (
    <svg
      className="header__search-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const [isRecipesMenuOpen, setIsRecipesMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => typeof window !== "undefined" && Boolean(getSessionUser()));
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsLoggedIn(Boolean(getSessionUser()));

    function handleStorage(event: StorageEvent) {
      if (event.key === SESSION_STORAGE_KEY || event.key === null) {
        setIsLoggedIn(Boolean(getSessionUser()));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsRecipesMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsRecipesMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleRecipesClick() {
    setIsRecipesMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    clearSessionUser();
    window.location.href = "/login";
  }

  return (
    <header className={`header${isRecipesMenuOpen ? " header--menu-open" : ""}`} ref={headerRef}>
      <div className="header__inner">
        <div className="header__left">
          <a className="header__logo" href="/">
            mealsy
          </a>
          <nav className="header__nav" aria-label="Основная навигация">
            <button
              className={`header__nav-link header__nav-trigger${isRecipesMenuOpen ? " header__nav-trigger--open" : ""}`}
              type="button"
              aria-expanded={isRecipesMenuOpen}
              aria-controls="recipes-mega-menu"
              onClick={handleRecipesClick}
            >
              Рецепты
            </button>
            <a className="header__nav-link" href="/spravochnik">
              Справочник
            </a>
          </nav>
        </div>

        <div className="header__search-wrap">
          <label className="header__search">
            <span className="header__search-visual">
              <SearchIcon />
            </span>
            <input
              className="header__search-input"
              type="search"
              name="recipe-search"
              placeholder="Поиск рецептов..."
              autoComplete="off"
            />
          </label>
        </div>

        <div className="header__actions">
          {isLoggedIn ? (
            <button className="header__login" type="button" onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <a className="header__login" href="/login">
              Войти
            </a>
          )}
        </div>
      </div>

      {isRecipesMenuOpen ? (
        <div className="header__mega" id="recipes-mega-menu">
          <div className="header__mega-inner">
            <div className="header__mega-col">
              <h3 className="header__mega-title">По времени приема</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Завтрак</a></li>
                <li><a href="/recipes">Обед</a></li>
                <li><a href="/recipes">Ужин</a></li>
                <li><a href="/recipes">Закуски</a></li>
              </ul>

              <h3 className="header__mega-title header__mega-title--spaced">По диете</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">С низким содержанием углеводов</a></li>
                <li><a href="/recipes">Вегетарианские блюда</a></li>
                <li><a href="/recipes">Веганские блюда</a></li>
              </ul>
            </div>

            <div className="header__mega-col">
              <h3 className="header__mega-title">Кухни мира</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Азиатская кухня</a></li>
                <li><a href="/recipes">Британская кухня</a></li>
                <li><a href="/recipes">Китайская кухня</a></li>
                <li><a href="/recipes">Русская кухня</a></li>
                <li><a href="/recipes">Французская кухня</a></li>
                <li><a href="/recipes">Немецкая кухня</a></li>
                <li><a href="/recipes">Греческая кухня</a></li>
                <li><a href="/recipes">Индийская кухня</a></li>
                <li><a href="/recipes">Итальянская кухня</a></li>
                <li><a href="/recipes">Японская кухня</a></li>
                <li><a href="/recipes">Мексиканская кухня</a></li>
                <li><a href="/recipes">Испанская кухня</a></li>
                <li><a href="/recipes">Турецкая кухня</a></li>
              </ul>
            </div>

            <div className="header__mega-col">
              <h3 className="header__mega-title">По типу блюда</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Мясные блюда</a></li>
                <li><a href="/recipes">Блюда из рыбы</a></li>
                <li><a href="/recipes">Пицца и паста</a></li>
                <li><a href="/recipes">Супы и рагу</a></li>
                <li><a href="/recipes">Салаты</a></li>
                <li><a href="/recipes">Десерты</a></li>
                <li><a href="/recipes">Запеканки</a></li>
                <li><a href="/recipes">Гарниры</a></li>
              </ul>
            </div>

            <div className="header__mega-col">
              <h3 className="header__mega-title">По типу рецепта</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Легкие рецепты</a></li>
                <li><a href="/recipes">Быстрые рецепты</a></li>
                <li><a href="/recipes">Рецепты для детей</a></li>
                <li><a href="/recipes">Пасхальные рецепты</a></li>
                <li><a href="/recipes">Рецепты для вечеринок</a></li>
                <li><a href="/recipes">Летние рецепты</a></li>
                <li><a href="/recipes">Рецепты со стражей</a></li>
              </ul>
            </div>

            <div className="header__mega-col">
              <h3 className="header__mega-title">Выпечка</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Хлеб</a></li>
                <li><a href="/recipes">Печенье</a></li>
                <li><a href="/recipes">Торты</a></li>
                <li><a href="/recipes">Бисквитные торты</a></li>
                <li><a href="/recipes">Слоеные торты</a></li>
              </ul>
            </div>

            <div className="header__mega-col">
              <h3 className="header__mega-title">Напитки</h3>
              <ul className="header__mega-list">
                <li><a href="/recipes">Смузи</a></li>
                <li><a href="/recipes">Соки</a></li>
                <li><a href="/recipes">Лимонады</a></li>
                <li><a href="/recipes">Коктейли</a></li>
                <li><a href="/recipes">Аперетивы</a></li>
                <li><a href="/recipes">Лонг-дринк</a></li>
              </ul>

              <h3 className="header__mega-title header__mega-title--spaced">Рецепт этой недели</h3>
              <a className="header__week-card" href="/recipes">
                <img className="header__week-img" src={weekRecipeImg} alt="Лимонный пирог с черникой" />
                <span className="header__week-name">Лимонный пирог с черникой</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
