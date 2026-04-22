import { FormEvent, useId } from "react";
import subscribeIllustration from "../../../assets/img/pngegg 1.png";
import "./NewsletterSubscribeSection.css";

export function NewsletterSubscribeSection() {
  const consentId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="newsletter-subscribe" aria-labelledby="newsletter-subscribe-heading">
      <div className="newsletter-subscribe__inner">
        <div className="newsletter-subscribe__card">
          <div className="newsletter-subscribe__content">
            <h2 className="newsletter-subscribe__title" id="newsletter-subscribe-heading">
              Каждую неделю подборка новых рецептов у вас на почте!
            </h2>

            <form className="newsletter-subscribe__form" onSubmit={handleSubmit} noValidate>
              <label className="newsletter-subscribe__field">
                <span className="newsletter-subscribe__sr-only">Ваше имя</span>
                <input className="newsletter-subscribe__input" type="text" name="name" placeholder="Ваше имя" autoComplete="name" />
              </label>
              <label className="newsletter-subscribe__field">
                <span className="newsletter-subscribe__sr-only">Email</span>
                <input
                  className="newsletter-subscribe__input"
                  type="email"
                  name="email"
                  placeholder="Ваш Email"
                  autoComplete="email"
                />
              </label>

              <div className="newsletter-subscribe__consent">
                <input className="newsletter-subscribe__checkbox" type="checkbox" id={consentId} name="consent" required />
                <label className="newsletter-subscribe__consent-label" htmlFor={consentId}>
                  Я подтверждаю согласие на{"\u00A0"}
                  <a className="newsletter-subscribe__legal-link" href="/privacy">
                    обработку{"\u00A0"}персональных{"\u00A0"}данных
                  </a>
                </label>
              </div>

              <button className="newsletter-subscribe__submit" type="submit">
                Подписаться
              </button>
            </form>
          </div>

          <div className="newsletter-subscribe__visual" aria-hidden="true">
            <img className="newsletter-subscribe__img" src={subscribeIllustration} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
