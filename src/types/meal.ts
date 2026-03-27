export type FoodCategory = 'Habesha' | 'Foreign';

export interface FoodItem {
  id: string;
  name: string;
  isExpensive?: boolean;
  isVeryExpensive?: boolean;
}

export interface MealSelection {
  breakfast?: string;
  mainDish: string;
  sideDish?: string;
}

export interface AppState {
  step: number;
  needsBreakfast: boolean | null;
  category: FoodCategory | null;
  hasMoney: boolean | null;
  hasLotsOfMoney: boolean | null;
  needsSideDish: boolean | null;
  result: MealSelection | null;
}