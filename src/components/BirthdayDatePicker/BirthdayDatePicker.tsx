import { useEffect, useId, useRef, useState } from "react";
import "./BirthdayDatePicker.css";

const WEEKDAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"] as const;

const MONTH_NAMES_RU = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatBirthdayRu(d: Date): string {
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function parseBirthdayRu(s: string): Date | null {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s.trim());
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]) - 1;
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm, dd);
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm || d.getDate() !== dd) return null;
  return d;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, 0);
}

function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1, 12, 0, 0, 0);
}

/** Пн = 0 … Вс = 6 */
function mondayIndexFromSunday(jsDay: number): number {
  return (jsDay + 6) % 7;
}

function buildMonthCells(viewMonth: Date): { date: Date; inCurrentMonth: boolean }[] {
  const y = viewMonth.getFullYear();
  const m = viewMonth.getMonth();
  const first = new Date(y, m, 1);
  const offset = mondayIndexFromSunday(first.getDay());
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev = new Date(y, m, 0).getDate();

  const cells: { date: Date; inCurrentMonth: boolean }[] = [];

  for (let i = 0; i < offset; i++) {
    const day = daysInPrev - offset + i + 1;
    cells.push({ date: new Date(y, m - 1, day, 12, 0, 0, 0), inCurrentMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(y, m, day, 12, 0, 0, 0), inCurrentMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(y, m + 1, nextDay, 12, 0, 0, 0), inCurrentMonth: false });
    nextDay += 1;
  }
  return cells;
}

function sameCalendarDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function endOfToday(): Date {
  const t = new Date();
  t.setHours(23, 59, 59, 999);
  return t;
}

function CalendarIcon() {
  return (
    <svg className="birthday-picker__icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
      <path d="M8 1L2 8l6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
      <path d="M2 1l6 7-6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type BirthdayDatePickerProps = {
  /** id для связи label–input (из useId родителя) */
  inputId: string;
  /** Начальное значение ДД.ММ.ГГГГ */
  defaultValue?: string;
};

export function BirthdayDatePicker({ inputId, defaultValue }: BirthdayDatePickerProps) {
  const listboxId = useId();
  const initial = defaultValue ? parseBirthdayRu(defaultValue) : null;
  const [selected, setSelected] = useState<Date | null>(initial);
  const [text, setText] = useState(() => (initial ? formatBirthdayRu(initial) : ""));
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(initial ?? new Date()));
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cells = buildMonthCells(viewMonth);
  const headerLabel = `${MONTH_NAMES_RU[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;

  function pickDay(date: Date) {
    if (date > endOfToday()) {
      return;
    }
    setSelected(date);
    setText(formatBirthdayRu(date));
    setViewMonth(startOfMonth(date));
    setOpen(false);
  }

  function handleInputChange(raw: string) {
    setText(raw);
    const parsed = parseBirthdayRu(raw);
    if (parsed) {
      setSelected(parsed);
      setViewMonth(startOfMonth(parsed));
    }
  }

  function handleInputBlur() {
    if (!text.trim()) {
      setSelected(null);
      return;
    }
    const parsed = parseBirthdayRu(text);
    if (parsed && parsed <= endOfToday()) {
      setSelected(parsed);
      setText(formatBirthdayRu(parsed));
      setViewMonth(startOfMonth(parsed));
    } else {
      setText(selected ? formatBirthdayRu(selected) : "");
    }
  }

  return (
    <div className="birthday-picker" ref={rootRef}>
      <input type="hidden" name="birthday" value={selected ? formatBirthdayRu(selected) : ""} readOnly aria-hidden="true" />
      <label className="birthday-picker__label" htmlFor={inputId}>
        <span className="birthday-picker__label-text">День рождения</span>
        <div className="birthday-picker__input-row">
          <input
            id={inputId}
            className="birthday-picker__input"
            type="text"
            inputMode="numeric"
            placeholder="ДД.ММ.ГГГГ"
            autoComplete="bday"
            value={text}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleInputBlur}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-haspopup="dialog"
          />
          <button
            className="birthday-picker__icon-btn"
            type="button"
            aria-label="Открыть календарь"
            onClick={() => setOpen((v) => !v)}
          >
            <CalendarIcon />
          </button>
        </div>
      </label>

      {open ? (
        <div className="birthday-picker__popover" id={listboxId} role="dialog" aria-label="Выбор даты рождения">
          <div className="birthday-picker__head">
            <button
              className="birthday-picker__nav"
              type="button"
              aria-label="Предыдущий месяц"
              onClick={() => setViewMonth((d) => addMonths(d, -1))}
            >
              <ChevronLeft />
            </button>
            <span className="birthday-picker__month">{headerLabel}</span>
            <button
              className="birthday-picker__nav"
              type="button"
              aria-label="Следующий месяц"
              onClick={() => setViewMonth((d) => addMonths(d, 1))}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="birthday-picker__weekdays" aria-hidden="true">
            {WEEKDAYS.map((d) => (
              <span key={d} className="birthday-picker__weekday">
                {d}
              </span>
            ))}
          </div>
          <div className="birthday-picker__grid">
            {cells.map(({ date, inCurrentMonth }, idx) => {
              const isSelected = selected !== null && sameCalendarDay(date, selected);
              return (
                <button
                  key={`${date.getTime()}-${idx}`}
                  type="button"
                  className={`birthday-picker__day${isSelected ? " birthday-picker__day--selected" : ""}${
                    inCurrentMonth ? "" : " birthday-picker__day--muted"
                  }`}
                  onClick={() => pickDay(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
