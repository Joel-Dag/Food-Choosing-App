import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealSelection } from '../types/meal';
import { motion } from "framer-motion";
import { RefreshCw, RotateCcw, CheckCircle2, UtensilsCrossed } from 'lucide-react';

interface Props {
  selection: MealSelection;
  onReroll: () => void;
  onRestart: () => void;
  onAccept: () => void;
}

const MealResult: React.FC<Props> = ({ selection, onReroll, onRestart, onAccept }) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto p-4 space-y-6">
      <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-3xl">
        <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
          <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-80" />
          <CardTitle className="text-3xl font-bold">የተመረጠው ምግብ</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {selection.breakfast && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">ቁርስ</p>
              <p className="text-2xl font-bold text-gray-800">{selection.breakfast}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">ምሳ (ዋና ምግብ)</p>
            <p className="text-2xl font-bold text-gray-800">{selection.mainDish}</p>
          </div>

          {selection.sideDish && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">አይነት (ተጓዳኝ)</p>
              <p className="text-2xl font-bold text-gray-800">{selection.sideDish}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <Button size="lg" className="h-16 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg" onClick={onReroll}>
          <RefreshCw className="mr-2 h-6 w-6" /> ሌላ ምረጥ
        </Button>
        <Button size="lg" variant="outline" className="h-16 text-xl rounded-2xl border-2 shadow-sm" onClick={onRestart}>
          <RotateCcw className="mr-2 h-6 w-6" /> እንደ አዲስ ጀምር
        </Button>
        <Button size="lg" className="h-16 text-xl rounded-2xl bg-green-600 hover:bg-green-700 shadow-lg" onClick={onAccept}>
          <CheckCircle2 className="mr-2 h-6 w-6" /> ይበቃል
        </Button>
      </div>
    </motion.div>
  );
};

export default MealResult;