import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: { breakfast: boolean; lunch: boolean; side: boolean }) => void;
  hasBreakfast: boolean;
  hasSide: boolean;
}

const RerollDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm, hasBreakfast, hasSide }) => {
  const [options, setOptions] = useState({
    breakfast: false,
    lunch: true,
    side: false
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">ምን መቀየር ይፈልጋሉ?</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {hasBreakfast && (
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50">
              <Checkbox id="breakfast" checked={options.breakfast} onCheckedChange={(val) => setOptions(prev => ({ ...prev, breakfast: !!val }))} className="h-6 w-6" />
              <Label htmlFor="breakfast" className="text-xl font-medium cursor-pointer flex-1">ቁርስ</Label>
            </div>
          )}
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50">
            <Checkbox id="lunch" checked={options.lunch} onCheckedChange={(val) => setOptions(prev => ({ ...prev, lunch: !!val }))} className="h-6 w-6" />
            <Label htmlFor="lunch" className="text-xl font-medium cursor-pointer flex-1">ምሳ</Label>
          </div>
          {hasSide && (
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50">
              <Checkbox id="side" checked={options.side} onCheckedChange={(val) => setOptions(prev => ({ ...prev, side: !!val }))} className="h-6 w-6" />
              <Label htmlFor="side" className="text-xl font-medium cursor-pointer flex-1">አይነት</Label>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button size="lg" className="w-full h-14 text-xl rounded-2xl bg-primary" onClick={() => onConfirm(options)}>ቀይር</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RerollDialog;