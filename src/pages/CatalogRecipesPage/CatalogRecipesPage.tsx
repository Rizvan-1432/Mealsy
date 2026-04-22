import { useEffect, useRef, useState } from "react";
import { RECIPE_SHOWCASE_CARDS } from "../../data/recipeShowcaseCards";
import subscribeIllustration from "../../../assets/img/pngegg 1.png";
import rect1 from "../../../assets/img/Rectangle_1.png";
import rect2 from "../../../assets/img/Rectangle_2.png";
import rect3 from "../../../assets/img/Rectangle_3.png";
import rect4 from "../../../assets/img/Rectangle_4.png";
import rect5 from "../../../assets/img/Rectangle_5.png";
import rect6 from "../../../assets/img/Rectangle_6.png";
import rect7 from "../../../assets/img/Rectangle_7.png";
import rect8 from "../../../assets/img/Rectangle_8.png";
import rect9 from "../../../assets/img/Rectangle_9.png";
import rect10 from "../../../assets/img/Rectangle_10.png";
import rect11 from "../../../assets/img/Rectangle_11.png";
import rect12 from "../../../assets/img/Rectangle_12.png";
import rect13 from "../../../assets/img/Rectangle_13.png";
import "./CatalogRecipesPage.css";

const CATALOG_CARDS = [
  { img: rect1, title: "Русская кухня" },
  { img: rect2, title: "Азиатская кухня" },
  { img: rect3, title: "Британская кухня" },
  { img: rect4, title: "Китайская кухня" },
  { img: rect5, title: "Французская кухня" },
  { img: rect6, title: "Немецкая кухня" },
  { img: rect7, title: "Греческая кухня" },
  { img: rect8, title: "Индийская кухня" },
  { img: rect9, title: "Итальянская кухня" },
  { img: rect10, title: "Японская кухня" },
  { img: rect11, title: "Мексиканская кухня" },
  { img: rect12, title: "Испанская кухня" },
  { img: rect13, title: "Турецкая кухня" },
] as const;

const DATE_SORT_OPTIONS = [
  "По популярности",
  "По количеству лайков",
  "По добавлению в избранное",
  "По калориям",
] as const;

const CUISINE_SORT_OPTIONS = [
  "Восточноевропейская кухня",
  "Азиатская кухня",
  "Британская кухня",
  "Китайская кухня",
  "Французская кухня",
  "Немецкая кухня",
  "Греческая кухня",
  "Индийская кухня",
  "Итальянская кухня",
  "Испанская кухня",
  "Японская кухня",
  "Мексиканская кухня",
  "Турецкая кухня",
] as const;

const EXTRA_FILTERS = [
  {
    title: "Тип питания",
    options: ["Диабетические рецепты", "Низкокалорийные рецепты", "ПП-рецепты", "Сыроедение", "Безглютеновые рецепты"],
  },
  {
    title: "Категории блюд",
    options: ["Блины, оладьи, сырники", "Соусы и заправки", "Каши", "Бутерброды", "Пельмени и вареники"],
  },
  {
    title: "Время приема",
    options: ["Бранч", "Завтрак", "Ланч", "Обед", "Перекус"],
  },
  {
    title: "Время приготовления",
    options: ["До 15 минут", "До 30 минут", "До 60 минут", "Более 1 часа"],
  },
  {
    title: "Событие",
    options: ["23 февраля", "8 марта", "Барбекю", "Вечеринка", "День рождения"],
  },
  {
    title: "Событие",
    options: ["Гриль, мангал", "Взбитое", "Замороженное, охлаждённое", "Варёное, тушёное", "Запечённое"],
  },
] as const;

function ArrowLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 6 8 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 4h12v16l-6-4-6 4V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c-.35 0-.7-.12-1-.35C7.4 18.2 3 14.55 3 9.75 3 6.58 5.36 4 8.25 4c1.54 0 3 .72 3.75 1.85A4.74 4.74 0 0 1 15.75 4C18.64 4 21 6.58 21 9.75c0 4.8-4.4 8.45-8 10.9-.3.23-.65.35-1 .35Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const CATALOG_RESULTS = Array.from({ length: 15 }, (_, index) => {
  const base = RECIPE_SHOWCASE_CARDS[index % RECIPE_SHOWCASE_CARDS.length];
  return {
    src: base.src,
    title: base.title,
    likes: base.likes,
    minutes: base.minutes,
  };
});

export function CatalogRecipesPage() {
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isCuisineMenuOpen, setIsCuisineMenuOpen] = useState(false);
  const isExtraFiltersOpen = true;
  const [openExtraGroups, setOpenExtraGroups] = useState<boolean[]>(
    EXTRA_FILTERS.map(() => true),
  );
  const [dateSort, setDateSort] = useState("По дате");
  const [cuisineSort, setCuisineSort] = useState("Кухне");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsDateMenuOpen(false);
        setIsCuisineMenuOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDateMenuOpen(false);
        setIsCuisineMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const toggleExtraGroup = (index: number) => {
    setOpenExtraGroups((prev) => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };

  return (
    <section className="catalog-page" aria-labelledby="catalog-page-title" ref={rootRef}>
      <h1 className="catalog-page__eyebrow">Каталог рецептов</h1>

      <div className="catalog-page__panel">
        <p className="catalog-page__breadcrumbs">
          <a href="/">Главная</a>
          <span aria-hidden="true"> / </span>
          <span>Каталог рецептов</span>
        </p>

        <h2 className="catalog-page__title" id="catalog-page-title">
          Каталог рецептов
        </h2>

        <div className="catalog-page__arrows" aria-hidden="true">
          <button type="button" className="catalog-page__arrow-btn">
            <ArrowLeft />
          </button>
          <button type="button" className="catalog-page__arrow-btn">
            <ArrowRight />
          </button>
        </div>

        <div className="catalog-page__cards-wrap">
          <ul className="catalog-page__cards">
            {CATALOG_CARDS.map(({ img, title }) => (
              <li key={title} className="catalog-page__card">
                <a href="/recipes" className="catalog-page__card-link">
                  <img className="catalog-page__card-img" src={img} alt={title} />
                  <span className="catalog-page__card-title">{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="catalog-page__filters">
          <div className="catalog-page__filters-left">
            <button type="button" className="catalog-page__filter-btn">
              Дополнительные фильтры
            </button>
            {isExtraFiltersOpen ? (
              <aside className="catalog-page__extra-filters" aria-label="Дополнительные фильтры">
                {EXTRA_FILTERS.map((group, index) => (
                  <section key={`${group.title}-${group.options[0]}`} className="catalog-page__extra-group">
                    <button
                      type="button"
                      className="catalog-page__extra-title"
                      onClick={() => toggleExtraGroup(index)}
                      aria-expanded={openExtraGroups[index]}
                    >
                      <span>{group.title}</span>
                      <span
                        className={`catalog-page__extra-title-arrow${openExtraGroups[index] ? "" : " catalog-page__extra-title-arrow--closed"}`}
                        aria-hidden="true"
                      >
                        ˄
                      </span>
                    </button>
                    {openExtraGroups[index] ? (
                      <>
                        <ul className="catalog-page__extra-list">
                          {group.options.map((option) => (
                            <li key={option}>
                              <label className="catalog-page__extra-option">
                                <input type="checkbox" />
                                <span>{option}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                        <button type="button" className="catalog-page__extra-more">
                          Смотреть все
                        </button>
                      </>
                    ) : null}
                  </section>
                ))}

                <button type="button" className="catalog-page__extra-apply">
                  Применить
                </button>
              </aside>
            ) : null}

            <aside className="catalog-page__mini-subscribe" aria-label="Подписка на рассылку">
              <div className="catalog-page__mini-subscribe-visual" aria-hidden="true">
                <img className="catalog-page__mini-subscribe-img" src={subscribeIllustration} alt="" />
              </div>
              <div className="catalog-page__mini-subscribe-body">
                <h3 className="catalog-page__mini-subscribe-title">Каждую неделю подборка новых рецептов у вас на почте!</h3>
                <form className="catalog-page__mini-subscribe-form">
                  <input className="catalog-page__mini-subscribe-input" type="email" placeholder="Ваш Email" autoComplete="email" />
                  <label className="catalog-page__mini-subscribe-consent">
                    <input type="checkbox" />
                    <span>
                      Я подтверждаю согласие на{" "}
                      <a href="/privacy" className="catalog-page__mini-subscribe-link">
                        обработку персональных данных
                      </a>
                    </span>
                  </label>
                  <button className="catalog-page__mini-subscribe-btn" type="button">
                    Подписаться
                  </button>
                </form>
              </div>
            </aside>
          </div>
          <div className="catalog-page__results">
            <div className="catalog-page__sorters">
              <div className="catalog-page__sorter">
                <button
                  type="button"
                  className="catalog-page__sort-btn"
                  aria-expanded={isDateMenuOpen}
                  onClick={() => setIsDateMenuOpen((prev) => !prev)}
                >
                  Сортировать по: <span>{dateSort}</span>
                </button>
                {isDateMenuOpen ? (
                  <ul className="catalog-page__menu" role="listbox" aria-label="Сортировка по дате">
                    {DATE_SORT_OPTIONS.map((option, index) => (
                      <li key={option}>
                        <button
                          type="button"
                          className={`catalog-page__menu-item${option === dateSort || (dateSort === "По дате" && index === 0) ? " catalog-page__menu-item--active" : ""}`}
                          onClick={() => {
                            setDateSort(option);
                            setIsDateMenuOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="catalog-page__sorter">
                <button
                  type="button"
                  className="catalog-page__sort-btn"
                  aria-expanded={isCuisineMenuOpen}
                  onClick={() => setIsCuisineMenuOpen((prev) => !prev)}
                >
                  Сортировать по: <span>{cuisineSort}</span>
                </button>
                {isCuisineMenuOpen ? (
                  <ul className="catalog-page__menu" role="listbox" aria-label="Сортировка по кухне">
                    {CUISINE_SORT_OPTIONS.map((option, index) => (
                      <li key={option}>
                        <button
                          type="button"
                          className={`catalog-page__menu-item${option === cuisineSort || (cuisineSort === "Кухне" && index === 0) ? " catalog-page__menu-item--active" : ""}`}
                          onClick={() => {
                            setCuisineSort(option);
                            setIsCuisineMenuOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <ul className="catalog-page__results-grid">
              {CATALOG_RESULTS.map((card, idx) => (
                <li key={`${card.title}-${idx}`} className="catalog-page__result-card">
                  <a href="/recipes" className="catalog-page__result-media-link" aria-label={card.title}>
                    <img className="catalog-page__result-img" src={card.src} alt="" />
                    <div className="catalog-page__result-gradient" aria-hidden="true" />
                    <span className="catalog-page__result-bookmark" aria-hidden="true">
                      <BookmarkIcon />
                    </span>
                    <div className="catalog-page__result-meta" aria-hidden="true">
                      <span className="catalog-page__result-meta-item">
                        <HeartIcon />
                        {card.likes}
                      </span>
                      <span className="catalog-page__result-meta-item">
                        <ClockIcon />
                        {card.minutes} мин
                      </span>
                    </div>
                  </a>
                  <a href="/recipes" className="catalog-page__result-title">
                    {card.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="catalog-page__load-more-wrap">
              <button type="button" className="catalog-page__load-more">
                Загрузить еще
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
