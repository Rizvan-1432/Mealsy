import fishCardImg from "../../../assets/img/Fish_1.png";
import "./SpravochnikPage.css";

const FISH_ITEMS = [
  "Балу",
  "Барбуля",
  "Креветки",
  "Форель",
  "Дорада",
  "Ерш",
  "Икра форели",
  "Икра кеты",
  "Кальмары",
  "Камбала",
  "Карп",
  "Кефаль",
  "Килька",
  "Корюшка",
  "Крабовое мясо",
  "Крев",
] as const;

export function SpravochnikPage() {
  return (
    <section className="spravochnik-page" aria-labelledby="spravochnik-page-title">
      <h1 className="spravochnik-page__eyebrow">Справочник</h1>

      <div className="spravochnik-page__panel">
        <p className="spravochnik-page__breadcrumbs">
          <a href="/">Главная</a>
          <span aria-hidden="true"> / </span>
          <span>Рыба и морепродукты</span>
        </p>

        <h2 className="spravochnik-page__title" id="spravochnik-page-title">
          Рыба и морепродукты
        </h2>

        <ul className="spravochnik-page__grid">
          {FISH_ITEMS.map((name) => (
            <li key={name} className="spravochnik-page__card">
              <a href="/spravochnik" className="spravochnik-page__card-link">
                <img src={fishCardImg} alt={name} className="spravochnik-page__card-img" />
                <span className="spravochnik-page__card-name">{name}</span>
                <span className="spravochnik-page__meta">Белки: 16 г</span>
                <span className="spravochnik-page__meta">Жиры: 8 г</span>
                <span className="spravochnik-page__meta">Углеводы: 0 г</span>
                <span className="spravochnik-page__meta">Ккал: 120</span>
              </a>
              <button type="button" className="spravochnik-page__btn">
                Посмотреть
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
