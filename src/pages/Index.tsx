import React, { useState } from 'react';
import { AppState, MealSelection } from '../types/meal';
import { useMealLogic } from '../hooks/useMealLogic';
import MealWizard from '../components/MealWizard';
import MealResult from '../components/MealResult';
import RerollDialog from '../components/RerollDialog';
import { showSuccess } from '../utils/toast';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Utensils } from 'lucide-react';

const initialState: AppState = {
  step: 1,
  needsBreakfast: null,
  category: null,
  hasMoney: null,
  hasLotsOfMoney: null,
  needsSideDish: null,
  result: null,
};

const Index = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [isRerollOpen, setIsRerollOpen] = useState(false);
  const { generateMeal, saveToHistory } = useMealLogic();

  const handleComplete = () => {
    // Small delay to allow state to update before generating
    setTimeout(() => {
      setState(prev => {
        const meal = generateMeal(prev);
        return { ...prev, result: meal };
      });
    }, 100);
  };

  const handleReroll = (options: { breakfast: boolean; lunch: boolean; side: boolean }) => {
    const newMeal = generateMeal(state);
    setState(prev => {
      if (!prev.result) return prev;
      const updatedResult: MealSelection = {
        breakfast: options.breakfast ? newMeal.breakfast : prev.result.breakfast,
        mainDish: options.lunch ? newMeal.mainDish : prev.result.mainDish,
        sideDish: options.side ? newMeal.sideDish : prev.result.sideDish,
      };
      return { ...prev, result: updatedResult };
    });
    setIsRerollOpen(false);
    showSuccess("ምግቡ ተቀይሯል!");
  };

  const handleAccept = () => {
    if (state.result) {
      saveToHistory(state.result);
      showSuccess("መልካም ምግብ!");
      setState(initialState);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-2">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Meal Chooser</h1>
        <p className="text-gray-500 text-sm">የምግብ መምረጫ</p>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {!state.result ? (
          <MealWizard state={state} setState={setState} onComplete={handleComplete} />
        ) : (
          <MealResult 
            selection={state.result} 
            onReroll={() => setIsRerollOpen(true)} 
            onRestart={() => setState(initialState)} 
            onAccept={handleAccept}
          />
        )}
      </main>

      <RerollDialog 
        isOpen={isRerollOpen} 
        onClose={() => setIsRerollOpen(false)} 
        onConfirm={handleReroll}
        hasBreakfast={!!state.needsBreakfast}
        hasSide={!!state.needsSideDish}
      />

      <footer className="p-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;