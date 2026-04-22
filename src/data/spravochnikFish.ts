export type SpravochnikFishItem = {
  slug: string;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  kcal: number;
};

export const SPRAVOCHNIK_FISH_ITEMS: SpravochnikFishItem[] = [
  { slug: "balu", name: "Балу", proteins: 16, fats: 8, carbs: 0, kcal: 120 },
  { slug: "barbulya", name: "Барбуля", proteins: 18, fats: 9, carbs: 0, kcal: 131 },
  { slug: "krevetki", name: "Креветки", proteins: 20, fats: 2, carbs: 0, kcal: 99 },
  { slug: "forel", name: "Форель", proteins: 21, fats: 6, carbs: 0, kcal: 136 },
  { slug: "dorada", name: "Дорада", proteins: 19, fats: 6, carbs: 0, kcal: 121 },
  { slug: "ersh", name: "Ерш", proteins: 17, fats: 5, carbs: 0, kcal: 110 },
  { slug: "ikra-foreli", name: "Икра форели", proteins: 24, fats: 13, carbs: 1, kcal: 198 },
  { slug: "ikra-kety", name: "Икра кеты", proteins: 31, fats: 13, carbs: 0, kcal: 249 },
  { slug: "kalmary", name: "Кальмары", proteins: 18, fats: 2, carbs: 2, kcal: 98 },
  { slug: "kambala", name: "Камбала", proteins: 17, fats: 4, carbs: 0, kcal: 103 },
  { slug: "karp", name: "Карп", proteins: 17, fats: 5, carbs: 0, kcal: 112 },
  { slug: "kefal", name: "Кефаль", proteins: 19, fats: 4, carbs: 0, kcal: 117 },
  { slug: "kilka", name: "Килька", proteins: 17, fats: 8, carbs: 0, kcal: 138 },
  { slug: "koryushka", name: "Корюшка", proteins: 15, fats: 5, carbs: 0, kcal: 102 },
  { slug: "krabovoe-myaso", name: "Крабовое мясо", proteins: 19, fats: 1, carbs: 0, kcal: 90 },
  { slug: "krev", name: "Крев", proteins: 16, fats: 6, carbs: 0, kcal: 118 },
];
