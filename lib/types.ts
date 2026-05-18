export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  note?: string;
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
  category: string;
  flavor: string;
  difficulty: number;
  time: number;
  serving: number;
  description: string;
  tags: string[];
  ingredients: Ingredient[];
  seasonings: Ingredient[];
  steps: Step[];
  principles: Principle[];
}
