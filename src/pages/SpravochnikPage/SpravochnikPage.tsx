import fishCardImg from "../../../assets/img/Fish_1.png";
import { SPRAVOCHNIK_FISH_ITEMS } from "../../data/spravochnikFish";
import "./SpravochnikPage.css";

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
          {SPRAVOCHNIK_FISH_ITEMS.map((item) => (
            <li key={item.slug} className="spravochnik-page__card">
              <a href={`/spravochnik/${item.slug}`} className="spravochnik-page__card-link">
                <img src={fishCardImg} alt={item.name} className="spravochnik-page__card-img" />
                <span className="spravochnik-page__card-name">{item.name}</span>
                <span className="spravochnik-page__meta">Белки: {item.proteins} г</span>
                <span className="spravochnik-page__meta">Жиры: {item.fats} г</span>
                <span className="spravochnik-page__meta">Углеводы: {item.carbs} г</span>
                <span className="spravochnik-page__meta">Ккал: {item.kcal}</span>
              </a>
              <a href={`/spravochnik/${item.slug}`} className="spravochnik-page__btn">
                Посмотреть
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
