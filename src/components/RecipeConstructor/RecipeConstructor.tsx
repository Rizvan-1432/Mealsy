import { useId, useState, type CSSProperties } from "react";
import alcoholIconSrc from "../../../assets/img/alcohol.png";
import eggIconSrc from "../../../assets/img/egg.png";
import fishIconSrc from "../../../assets/img/fish.png";
import milkIconSrc from "../../../assets/img/Milk.png";
import onionIconSrc from "../../../assets/img/onion.png";
import porkIconSrc from "../../../assets/img/pork.png";
import "./RecipeConstructor.css";

const COOKING_LABELS = [
  "До 20 минут",
  "До 30 минут",
  "До 60 минут",
  "Более 1 часа",
] as const;

const EXCLUSIONS = [
  { id: "milk", label: "Молоко" },
  { id: "eggs", label: "Яйца" },
  { id: "onion", label: "Лук" },
  { id: "pork", label: "Свинина" },
  { id: "fish", label: "Рыба" },
  { id: "alcohol", label: "Алкоголь" },
] as const;

function HelpIcon() {
  return (
    <span className="recipe-constructor__help" title="Подсказка">
      ?
    </span>
  );
}

function AlertIcon() {
  return (
    <svg
      className="recipe-constructor__alert-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#e85d4c" />
      <path
        d="M12 7v6M12 16h.01"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExclusionIcon({ type }: { type: (typeof EXCLUSIONS)[number]["id"] }) {
  switch (type) {
    case "milk":
      return (
        <img
          src={milkIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    case "eggs":
      return (
        <img
          src={eggIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    case "onion":
      return (
        <img
          src={onionIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img recipe-constructor__exclusion-img--onion"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    case "pork":
      return (
        <img
          src={porkIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    case "fish":
      return (
        <img
          src={fishIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    case "alcohol":
      return (
        <img
          src={alcoholIconSrc}
          alt=""
          className="recipe-constructor__exclusion-img"
          width={72}
          height={72}
          decoding="async"
          aria-hidden="true"
        />
      );
    default:
      return null;
  }
}

export function RecipeConstructor() {
  const titleId = useId();
  const timeId = useId();
  const [products, setProducts] = useState("");
  const [extraLevel, setExtraLevel] = useState<number | null>(null);
  const [cookingStep, setCookingStep] = useState(0);
  const [excluded, setExcluded] = useState<Set<string>>(() => new Set());

  const toggleExclusion = (id: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleClear = () => {
    setProducts("");
    setExtraLevel(null);
    setCookingStep(0);
    setExcluded(new Set());
  };

  return (
    <div className="recipe-constructor-page">
      <section className="recipe-constructor" aria-labelledby={titleId}>
        <div className="recipe-constructor__card">
          <header className="recipe-constructor__head">
            <h2 className="recipe-constructor__title" id={titleId}>
              Конструктор рецептов
            </h2>
            <p className="recipe-constructor__lead">
              {`Выберите продукты, которые есть в вашем холодильнике. "Конструктор рецептов" подберёт рецепты на основе ваших ингредиентов. Максимальное количество продуктов 7.`}
            </p>
          </header>

          <div className="recipe-constructor__stem">
            <div className="recipe-constructor__grid">
            <div className="recipe-constructor__col">
              <div className="recipe-constructor__field recipe-constructor__field--products">
                <label className="recipe-constructor__label" htmlFor="recipe-products">
                  Введите имеющиеся продукты:
                </label>
                <div className="recipe-constructor__input-wrap">
                  <span className="recipe-constructor__input-prefix" aria-hidden="true">
                    +
                  </span>
                  <input
                    id="recipe-products"
                    className="recipe-constructor__input"
                    type="text"
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    placeholder="Ингредиент"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="recipe-constructor__field recipe-constructor__field--after-ingredients">
                <div className="recipe-constructor__label-row">
                  <span className="recipe-constructor__label">
                    Включить в рецепт дополнительные ингредиенты?
                  </span>
                  <HelpIcon />
                </div>
                <div className="recipe-constructor__steps" role="group" aria-label="Уровень дополнительных ингредиентов">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={
                        "recipe-constructor__step" +
                        (extraLevel === n ? " recipe-constructor__step--active" : "")
                      }
                      onClick={() => setExtraLevel((cur) => (cur === n ? null : n))}
                      aria-pressed={extraLevel === n}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="recipe-constructor__hint" role="note">
                  <AlertIcon />
                  <span>
                    Специи, соусы, сиропы и зелень не являются основными ингредиентами
                  </span>
                </p>
              </div>
            </div>

            <div className="recipe-constructor__col">
              <div className="recipe-constructor__field recipe-constructor__field--cooking-time">
                <label className="recipe-constructor__label" htmlFor={timeId}>
                  Время приготовления:
                </label>
                <div
                  className="recipe-constructor__slider-block"
                  style={
                    {
                      "--recipe-range-pct": `${(cookingStep / (COOKING_LABELS.length - 1)) * 100}%`,
                    } as CSSProperties
                  }
                >
                  <input
                    id={timeId}
                    className="recipe-constructor__range"
                    type="range"
                    min={0}
                    max={COOKING_LABELS.length - 1}
                    step={1}
                    value={cookingStep}
                    onChange={(e) => setCookingStep(Number(e.target.value))}
                  />
                  <div className="recipe-constructor__ticks" aria-hidden="true">
                    {COOKING_LABELS.map((label) => (
                      <span key={label} className="recipe-constructor__tick">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="recipe-constructor__field recipe-constructor__field--spaced recipe-constructor__field--exclusions">
                <span className="recipe-constructor__label">Исключить из рецепта:</span>
                <ul className="recipe-constructor__exclusions">
                  {EXCLUSIONS.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        type="button"
                        className={
                          "recipe-constructor__exclusion" +
                          (excluded.has(id) ? " recipe-constructor__exclusion--active" : "")
                        }
                        onClick={() => toggleExclusion(id)}
                        aria-pressed={excluded.has(id)}
                      >
                        <span className="recipe-constructor__exclusion-icon">
                          <ExclusionIcon type={id} />
                        </span>
                        <span className="recipe-constructor__exclusion-label">{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

            <footer className="recipe-constructor__footer">
              <button className="recipe-constructor__btn recipe-constructor__btn--primary" type="button">
                Применить
              </button>
              <button
                className="recipe-constructor__btn recipe-constructor__btn--ghost"
                type="button"
                onClick={handleClear}
              >
                Очистить всё
              </button>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}
