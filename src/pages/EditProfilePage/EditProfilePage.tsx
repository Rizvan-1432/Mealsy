import { FormEvent, useId } from "react";
import { BirthdayDatePicker } from "../../components/BirthdayDatePicker/BirthdayDatePicker";
import { GenderSelect } from "../../components/GenderSelect/GenderSelect";
import { clearSessionUser } from "../../auth/session";
import "./EditProfilePage.css";

export function EditProfilePage() {
  const nameId = useId();
  const birthId = useId();
  const genderId = useId();
  const emailId = useId();
  const passNewId = useId();
  const passRepeatId = useId();
  const avatarInputId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="edit-profile-page" aria-labelledby="edit-profile-title">
      <p className="edit-profile-page__meta">Личный кабинет редактировать профиль</p>

      <div className="edit-profile-page__panel">
        <p className="edit-profile-page__breadcrumbs">
          <a href="/">Главная</a>
          <span aria-hidden="true"> / </span>
          <a href="/profile/edit">Профиль</a>
          <span aria-hidden="true"> / </span>
          <span>Редактировать профиль</span>
        </p>

        <h1 className="edit-profile-page__title" id="edit-profile-title">
          Редактировать профиль
        </h1>

        <form className="edit-profile-page__form" onSubmit={handleSubmit} noValidate>
          <div className="edit-profile-page__avatar-block">
            <div className="edit-profile-page__avatar" aria-hidden="true">
              B
            </div>
            <div className="edit-profile-page__avatar-actions">
              <input className="edit-profile-page__avatar-input" id={avatarInputId} type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" />
              <label className="edit-profile-page__avatar-upload" htmlFor={avatarInputId}>
                Загрузить изображение
              </label>
              <p className="edit-profile-page__avatar-hint">Изображения должны быть в формате jpg, png</p>
            </div>
          </div>

          <div className="edit-profile-page__block">
            <label className="edit-profile-page__field" htmlFor={nameId}>
              <span className="edit-profile-page__label">
                Ваше имя <span className="edit-profile-page__req">*</span>
              </span>
              <input id={nameId} type="text" name="name" defaultValue="Тони" autoComplete="name" required />
            </label>
            <p className="edit-profile-page__privacy">
              Нажимая кнопку «Сохранить изменения», вы даёте согласие на{" "}
              <a className="edit-profile-page__inline-link" href="/privacy">
                обработку персональных данных
              </a>{" "}
              и принимаете условия{" "}
              <a className="edit-profile-page__inline-link" href="/terms">
                пользовательского соглашения
              </a>
              .
            </p>
          </div>

          <div className="edit-profile-page__row">
            <div className="edit-profile-page__picker-cell">
              <BirthdayDatePicker inputId={birthId} />
            </div>

            <div className="edit-profile-page__field">
              <label className="edit-profile-page__label" htmlFor={genderId}>
                Пол
              </label>
              <GenderSelect id={genderId} name="gender" />
            </div>
          </div>

          <div className="edit-profile-page__block">
            <label className="edit-profile-page__field" htmlFor={emailId}>
              <span className="edit-profile-page__label">Ваш Email</span>
              <input id={emailId} type="email" name="email" defaultValue="tonystark@gmail.com" autoComplete="email" disabled />
            </label>
          </div>

          <div className="edit-profile-page__password-block">
            <h2 className="edit-profile-page__subheading">Изменить пароль</h2>
            <p className="edit-profile-page__password-hint">Ваш пароль должен содержать не менее 8 символов</p>
            <div className="edit-profile-page__row">
              <label className="edit-profile-page__field" htmlFor={passNewId}>
                <span className="edit-profile-page__label">Новый пароль</span>
                <input id={passNewId} type="password" name="password-new" autoComplete="new-password" />
              </label>
              <label className="edit-profile-page__field" htmlFor={passRepeatId}>
                <span className="edit-profile-page__label">Повторить пароль</span>
                <input id={passRepeatId} type="password" name="password-repeat" autoComplete="new-password" />
              </label>
            </div>
          </div>

          <div className="edit-profile-page__actions">
            <button className="edit-profile-page__save" type="submit">
              Сохранить изменения
            </button>
            <a
              className="edit-profile-page__logout"
              href="/login"
              onClick={() => {
                clearSessionUser();
              }}
            >
              Выйти
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
