import { AfterConstructorLorem } from "./components/AfterConstructorLorem/AfterConstructorLorem";
import { Header } from "./components/Header/Header";
import { NewRecipesSection } from "./components/NewRecipesSection/NewRecipesSection";
import { PopularRecipesSection } from "./components/PopularRecipesSection/PopularRecipesSection";
import { RecipeCatalogSection } from "./components/RecipeCatalogSection/RecipeCatalogSection";
import { NewsletterSubscribeSection } from "./components/NewsletterSubscribeSection/NewsletterSubscribeSection";
import { Footer } from "./components/Footer/Footer";
import { RecipeConstructor } from "./components/RecipeConstructor/RecipeConstructor";
import { CatalogRecipesPage } from "./pages/CatalogRecipesPage/CatalogRecipesPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { SpravochnikPage } from "./pages/SpravochnikPage/SpravochnikPage";
import "./App.css";

function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const isCatalogPage = pathname === "/catalog-recipes";
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isSpravochnikPage = pathname === "/spravochnik";

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {isRegisterPage ? (
          <RegisterPage />
        ) : isLoginPage ? (
          <LoginPage />
        ) : isSpravochnikPage ? (
          <>
            <SpravochnikPage />
            <NewsletterSubscribeSection />
          </>
        ) : isCatalogPage ? (
          <CatalogRecipesPage />
        ) : (
          <>
            <RecipeConstructor />
            <AfterConstructorLorem />
            <NewRecipesSection />
            <PopularRecipesSection />
            <RecipeCatalogSection />
            <NewsletterSubscribeSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
