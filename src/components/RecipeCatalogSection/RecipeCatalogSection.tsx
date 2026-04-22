import { RECIPE_SHOWCASE_CARDS } from "../../data/recipeShowcaseCards";
import "./RecipeCatalogSection.css";

function BookmarkIcon() {
  return (
    <svg className="recipe-catalog__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4h12v16l-6-4-6 4V4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="recipe-catalog__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c-.35 0-.7-.12-1-.35C7.4 18.2 3 14.55 3 9.75 3 6.58 5.36 4 8.25 4c1.54 0 3 .72 3.75 1.85A4.74 4.74 0 0 1 15.75 4C18.64 4 21 6.58 21 9.75c0 4.8-4.4 8.45-8 10.9-.3.23-.65.35-1 .35Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="recipe-catalog__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function RecipeCatalogSection() {
  return (
    <section className="recipe-catalog" aria-labelledby="recipe-catalog-heading">
      <div className="recipe-catalog__inner">
        <h2 className="recipe-catalog__title" id="recipe-catalog-heading">
          <a className="recipe-catalog__title-link-main" href="/catalog-recipes">
            Каталог рецептов
          </a>
        </h2>

        <div className="recipe-catalog__grid">
          {RECIPE_SHOWCASE_CARDS.map(({ src, title, likes, minutes }) => (
            <article key={title} className="recipe-catalog__card">
              <div className="recipe-catalog__media">
                <a className="recipe-catalog__img-link" href="/recipes" aria-label={title}>
                  <img className="recipe-catalog__img" src={src} alt="" />
                </a>
                <div className="recipe-catalog__gradient" aria-hidden="true" />
                <button type="button" className="recipe-catalog__bookmark" aria-label="В закладки">
                  <BookmarkIcon />
                </button>
                <div className="recipe-catalog__overlay-meta" aria-hidden="true">
                  <span className="recipe-catalog__likes">
                    <HeartIcon />
                    <span>{likes}</span>
                  </span>
                  <span className="recipe-catalog__time">
                    <ClockIcon />
                    {minutes} мин
                  </span>
                </div>
              </div>
              <h3 className="recipe-catalog__card-title">
                <a className="recipe-catalog__title-link" href="/recipes">
                  {title}
                </a>
              </h3>
            </article>
          ))}
        </div>

        <div className="recipe-catalog__actions">
          <a className="recipe-catalog__btn" href="/recipes">
            Смотреть все рецепты
          </a>
        </div>
      </div>
    </section>
  );
}
