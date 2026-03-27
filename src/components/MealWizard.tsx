import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { AppState, FoodCategory } from '../types/meal';
import { Utensils, Coffee, Wallet, PlusCircle } from 'lucide-react';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onComplete: () => void;
}

const MealWizard: React.FC<Props> = ({ state, setState, onComplete }) => {
  const nextStep = (updates: Partial<AppState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates, step: prev.step + 1 };
      return newState;
    });
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex justify-center mb-4">
              <Coffee className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800">ቁርስ ያስፈልጋል?</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button size="lg" className="h-16 text-xl rounded-2xl bg-green-600 hover:bg-green-700" onClick={() => nextStep({ needsBreakfast: true })}>አዎ</Button>
              <Button size="lg" variant="outline" className="h-16 text-xl rounded-2xl border-2" onClick={() => nextStep({ needsBreakfast: false })}>አያስፈልግም</Button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex justify-center mb-4">
              <Utensils className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800">የትኛው ይሻላል?</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button size="lg" className="h-16 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700" onClick={() => nextStep({ category: 'Habesha' })}>ሀበሻ ምግብ</Button>
              <Button size="lg" className="h-16 text-xl rounded-2xl bg-purple-600 hover:bg-purple-700" onClick={() => nextStep({ category: 'Foreign' })}>የውጭ ምግብ</Button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex justify-center mb-4">
              <Wallet className="w-16 h-16 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800">ብር አለ?</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button size="lg" className="h-16 text-xl rounded-2xl bg-yellow-600 hover:bg-yellow-700" onClick={() => nextStep({ hasMoney: true })}>አለኝ</Button>
              <Button size="lg" variant="outline" className="h-16 text-xl rounded-2xl border-2" onClick={() => nextStep({ hasMoney: false, hasLotsOfMoney: false, step: 4 })}>የለኝም</Button>
            </div>
          </motion.div>
        );
      case 4:
        if (state.hasMoney) {
          return (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex justify-center mb-4">
                <Wallet className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800">በጣም አለ?</h2>
              <div className="grid grid-cols-1 gap-4">
                <Button size="lg" className="h-16 text-xl rounded-2xl bg-green-600 hover:bg-green-700" onClick={() => nextStep({ hasLotsOfMoney: true })}>በጣም!</Button>
                <Button size="lg" variant="outline" className="h-16 text-xl rounded-2xl border-2" onClick={() => nextStep({ hasLotsOfMoney: false })}>መካከለኛ</Button>
              </div>
            </motion.div>
          );
        }
        nextStep({}); // Skip if no money
        return null;
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex justify-center mb-4">
              <PlusCircle className="w-16 h-16 text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800">አይነት ያስፈልጋል?</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button size="lg" className="h-16 text-xl rounded-2xl bg-pink-600 hover:bg-pink-700" onClick={() => { setState(prev => ({ ...prev, needsSideDish: true })); onComplete(); }}>አዎ</Button>
              <Button size="lg" variant="outline" className="h-16 text-xl rounded-2xl border-2" onClick={() => { setState(prev => ({ ...prev, needsSideDish: false })); onComplete(); }}>አያስፈልግም</Button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default MealWizard;