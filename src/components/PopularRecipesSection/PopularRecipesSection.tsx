import { RECIPE_SHOWCASE_CARDS } from "../../data/recipeShowcaseCards";
import "./PopularRecipesSection.css";

function BookmarkIcon() {
  return (
    <svg className="popular-recipes__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg className="popular-recipes__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg className="popular-recipes__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function PopularRecipesSection() {
  return (
    <section className="popular-recipes" aria-labelledby="popular-recipes-heading">
      <div className="popular-recipes__inner">
        <h2 className="popular-recipes__title" id="popular-recipes-heading">
          Популярные рецепты
        </h2>

        <div className="popular-recipes__grid">
          {RECIPE_SHOWCASE_CARDS.map(({ src, title, likes, minutes }) => (
            <article key={title} className="popular-recipes__card">
              <div className="popular-recipes__media">
                <a className="popular-recipes__img-link" href="/recipes" aria-label={title}>
                  <img className="popular-recipes__img" src={src} alt="" />
                </a>
                <div className="popular-recipes__gradient" aria-hidden="true" />
                <button type="button" className="popular-recipes__bookmark" aria-label="В закладки">
                  <BookmarkIcon />
                </button>
                <div className="popular-recipes__overlay-meta" aria-hidden="true">
                  <span className="popular-recipes__likes">
                    <HeartIcon />
                    <span>{likes}</span>
                  </span>
                  <span className="popular-recipes__time">
                    <ClockIcon />
                    {minutes} мин
                  </span>
                </div>
              </div>
              <h3 className="popular-recipes__card-title">
                <a className="popular-recipes__title-link" href="/recipes">
                  {title}
                </a>
              </h3>
            </article>
          ))}
        </div>

        <div className="popular-recipes__actions">
          <a className="popular-recipes__btn" href="/recipes">
            Смотреть все рецепты
          </a>
        </div>
      </div>
    </section>
  );
}
