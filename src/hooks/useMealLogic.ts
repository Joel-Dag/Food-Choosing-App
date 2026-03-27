import { useState, useEffect } from 'react';
import { BREAKFAST_LIST, HABESHA_MAINS, FOREIGN_MAINS, SIDE_DISHES } from '../data/meals';
import { AppState, MealSelection, FoodCategory } from '../types/meal';

const HISTORY_KEY = 'meal_chooser_history';

export const useMealLogic = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (selection: MealSelection) => {
    const combo = `${selection.breakfast || ''}|${selection.mainDish}|${selection.sideDish || ''}`;
    const newHistory = [...history, combo];
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const getRandomItem = (list: any[], excludeList: string[] = []) => {
    const filtered = list.filter(item => !excludeList.includes(typeof item === 'string' ? item : item.name));
    const source = filtered.length > 0 ? filtered : list;
    return source[Math.floor(Math.random() * source.length)];
  };

  const generateMeal = (state: AppState): MealSelection => {
    let breakfast: string | undefined;
    let mainDish: string = "";
    let sideDish: string | undefined;

    // 1. Breakfast
    if (state.needsBreakfast) {
      breakfast = getRandomItem(BREAKFAST_LIST);
    }

    // 2. Main Dish Logic
    if (state.category === 'Habesha') {
      if (state.hasMoney === false) {
        const options = HABESHA_MAINS.filter(m => !m.isExpensive);
        mainDish = getRandomItem(options).name;
      } else if (state.hasLotsOfMoney) {
        // Logic says "always choose ፓስታ ላ ፉርኖ" but that's foreign. 
        // For Habesha with lots of money, we'll pick from expensive ones.
        const options = HABESHA_MAINS.filter(m => m.isExpensive);
        mainDish = getRandomItem(options).name;
      } else {
        const options = HABESHA_MAINS.filter(m => m.isExpensive);
        mainDish = getRandomItem(options).name;
      }
    } else {
      if (state.hasMoney === false) {
        const options = FOREIGN_MAINS.filter(m => !m.isVeryExpensive);
        mainDish = getRandomItem(options).name;
      } else if (state.hasLotsOfMoney) {
        mainDish = "ፓስታ ላ ፉርኖ";
      } else {
        const options = FOREIGN_MAINS.filter(m => !m.isVeryExpensive);
        mainDish = getRandomItem(options).name;
      }
    }

    // 3. Side Dish Logic
    if (state.needsSideDish) {
      let options = SIDE_DISHES;
      if (state.hasMoney === false) {
        options = SIDE_DISHES.filter(s => !s.isExpensive);
      }
      sideDish = getRandomItem(options).name;
    }

    return { breakfast, mainDish, sideDish };
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { generateMeal, saveToHistory, clearHistory, history };
};