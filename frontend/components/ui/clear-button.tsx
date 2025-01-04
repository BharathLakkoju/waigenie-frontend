import { Button } from "./button";
import { Trash2 } from "lucide-react";

interface ClearButtonProps {
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <Button
      onClick={onClear}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
    >
      <Trash2 className="w-4 h-4" />
      Clear All
    </Button>
  );
};
