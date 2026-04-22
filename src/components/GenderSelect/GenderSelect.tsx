import { useEffect, useId, useRef, useState } from "react";
import "./GenderSelect.css";

type GenderValue = "" | "female" | "male";

const OPTIONS: { value: Exclude<GenderValue, "">; label: string }[] = [
  { value: "female", label: "Женский" },
  { value: "male", label: "Мужской" },
];

type GenderSelectProps = {
  id: string;
  name?: string;
};

function ChevronDown() {
  return (
    <svg className="gender-select__chevron-svg" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 1.5L6 6.5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GenderSelect({ id, name = "gender" }: GenderSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<GenderValue>("");

  const displayLabel = value === "" ? "Выберите пол" : value === "female" ? "Женский" : "Мужской";

  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: GenderValue) {
    setValue(next);
    setOpen(false);
  }

  return (
    <div className="gender-select" ref={rootRef}>
      <input type="hidden" name={name} value={value} readOnly aria-hidden="true" />
      <button
        id={id}
        type="button"
        className={`gender-select__trigger${open ? " gender-select__trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value === "" ? "gender-select__value gender-select__value--placeholder" : "gender-select__value"}>
          {displayLabel}
        </span>
        <span className="gender-select__chevron" aria-hidden="true">
          <ChevronDown />
        </span>
      </button>

      {open ? (
        <div id={listId} className="gender-select__menu" role="listbox" aria-label="Пол">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              className={`gender-select__option${value === opt.value ? " gender-select__option--current" : ""}`}
              onClick={() => choose(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
