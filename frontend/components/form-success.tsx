import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
  className?: string;
}

export default function FormSuccess({ message, className }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div
      className={`bg-emerald-500/15 p-2 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 ${className}`}
    >
      <CheckCircledIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
