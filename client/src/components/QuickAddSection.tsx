// QuickAddSection.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface CommonCondition {
    id: number;
    name: string;
    prompt: string;
}

interface QuickAddSectionProps {
    conditions: CommonCondition[];
    onQuickAdd: (prompt: string) => void;
}

const QuickAddSection: React.FC<QuickAddSectionProps> = ({ conditions, onQuickAdd }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 shrink-0">
      {conditions.map((condition) => (
        <Button
          key={condition.id}
          variant="outline"
          size="sm"
          onClick={() => onQuickAdd(condition.prompt)}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          {condition.name}
        </Button>
      ))}
    </div>
  );
};

export default QuickAddSection;