export interface Ingredient {
  name: string;
  name_en: string;
  amount: number;
  unit: string;
  unit_en?: string;
  note?: string;
  note_en?: string;
}

export interface Step {
  step: number;
  title: string;
  desc: string;
  indicator: string;
  tip?: string;
}

export interface Principle {
  title: string;
  content: string;
}

export interface Recipe {
  id: string;
  name: string;
  name_en: string;
  category: string;
  category_en: string;
  flavor: string;
  flavor_en: string;
  difficulty: number;
  time: number;
  serving: number;
  description: string;
  description_en: string;
  tags: string[];
  tags_en: string[];
  ingredients: Ingredient[];
  seasonings: Ingredient[];
  steps: Step[];
  steps_en: Step[];
  principles: Principle[];
  principles_en: Principle[];
}
