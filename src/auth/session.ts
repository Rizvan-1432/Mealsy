export const SESSION_STORAGE_KEY = "mealsy_session_user";

export type SessionUser = {
  name: string;
  email: string;
};

export function getSessionUser(): SessionUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as Partial<SessionUser>;
    if (typeof data.email === "string" && typeof data.name === "string") {
      return { name: data.name, email: data.email };
    }
    return null;
  } catch {
    return null;
  }
}

export function setSessionUser(user: SessionUser): void {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearSessionUser(): void {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}
