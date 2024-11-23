import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export default function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;
  return (
    <div
      className={`bg-destructive/15 rounded-md p-2 flex gap-x-2 items-center text-sm text-destructive ${className}`}
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
