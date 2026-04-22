import fishCardImg from "../../../assets/img/Fish_1.png";
import { RECIPE_SHOWCASE_CARDS } from "../../data/recipeShowcaseCards";
import { SPRAVOCHNIK_FISH_ITEMS } from "../../data/spravochnikFish";
import "./SpravochnikItemPage.css";

type SpravochnikItemPageProps = {
  slug: string;
};

export function SpravochnikItemPage({ slug }: SpravochnikItemPageProps) {
  const item = SPRAVOCHNIK_FISH_ITEMS.find((fish) => fish.slug === slug) ?? SPRAVOCHNIK_FISH_ITEMS[0];
  const recipes = Array.from({ length: 8 }, (_, idx) => RECIPE_SHOWCASE_CARDS[idx % RECIPE_SHOWCASE_CARDS.length]);
  const nutritionCards = [
    { key: "energy", label: "энергия", value: `${item.kcal} Ккал`, modifier: "mint" },
    { key: "proteins", label: "белки", value: `${item.proteins} гр.`, modifier: "pink" },
    { key: "fats", label: "жиры", value: `${item.fats} гр.`, modifier: "blue" },
    { key: "carbs", label: "углеводы", value: `${item.carbs} гр.`, modifier: "sand" },
  ] as const;
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <section className="spr-item" aria-labelledby="spr-item-title">
      <h1 className="spr-item__eyebrow">Справочник</h1>

      <div className="spr-item__panel">
        <p className="spr-item__breadcrumbs">
          <a href="/">Главная</a>
          <span aria-hidden="true"> / </span>
          <a href="/spravochnik">Рыба и морепродукты</a>
          <span aria-hidden="true"> / </span>
          <span>{item.name}</span>
        </p>

        <div className="spr-item__top">
          <img src={fishCardImg} alt={item.name} className="spr-item__image" />
          <div className="spr-item__info">
            <h2 className="spr-item__title" id="spr-item-title">
              {item.name}
            </h2>
            <p className="spr-item__note">Пищевая ценность в порции:</p>
            <div className="spr-item__badges">
              {nutritionCards.map((card) => (
                <span key={card.key} className={`spr-item__badge spr-item__badge--${card.modifier}`}>
                  <span className="spr-item__badge-label">{card.label}</span>
                  <span className="spr-item__badge-value">{card.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="spr-item__text-content">
          <p className="spr-item__paragraph">{loremText}</p>

          <section className="spr-item__text-section">
            <h3 className="spr-item__section-title">Полезные свойства</h3>
            <p className="spr-item__paragraph">{loremText}</p>
          </section>

          <section className="spr-item__text-section">
            <h3 className="spr-item__section-title">Применения</h3>
            <p className="spr-item__paragraph">{loremText}</p>
          </section>
        </div>

        <h3 className="spr-item__recipes-title">Рецепты из белуги</h3>
        <ul className="spr-item__recipes">
          {recipes.map((recipe, index) => (
            <li key={`${recipe.title}-${index}`} className="spr-item__recipe-card">
              <a href="/recipes" className="spr-item__recipe-link">
                <img src={recipe.src} alt="" className="spr-item__recipe-image" />
                <span className="spr-item__recipe-name">{recipe.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="spr-item__more-wrap">
          <button className="spr-item__more" type="button">
            Загрузить еще
          </button>
        </div>

        <div className="spr-item__comments">
          <h3 className="spr-item__comments-title">4 комментария</h3>
          <textarea className="spr-item__comment-input" placeholder="Напишите свой комментарий...." />

          <div className="spr-item__comment-thread">
            <div className="spr-item__comment">
              <span className="spr-item__avatar" aria-hidden="true" />
              <div className="spr-item__comment-body">
                <strong className="spr-item__comment-author">Top Одинсон</strong>
                <span className="spr-item__comment-date">10 мая в 12:35</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </div>
            </div>

            <div className="spr-item__comment spr-item__comment--nested">
              <span className="spr-item__avatar" aria-hidden="true" />
              <div className="spr-item__comment-body">
                <strong className="spr-item__comment-author">Top Одинсон</strong>
                <span className="spr-item__comment-date">10 мая в 12:35</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </div>
            </div>

            <div className="spr-item__comment">
              <span className="spr-item__avatar" aria-hidden="true" />
              <div className="spr-item__comment-body">
                <strong className="spr-item__comment-author">Марина</strong>
                <span className="spr-item__comment-date">11 мая в 09:10</span>
                <p>Понравился раздел, подробно и понятно. Добавила рецепт в избранное.</p>
              </div>
            </div>

            <div className="spr-item__comment">
              <span className="spr-item__avatar" aria-hidden="true" />
              <div className="spr-item__comment-body">
                <strong className="spr-item__comment-author">Илья</strong>
                <span className="spr-item__comment-date">11 мая в 14:22</span>
                <p>Отлично подходит для запекания. Спасибо за информацию по БЖУ.</p>
              </div>
            </div>
          </div>

          <button className="spr-item__comment-btn" type="button">
            Загрузить больше
          </button>
        </div>
      </div>
    </section>
  );
}
