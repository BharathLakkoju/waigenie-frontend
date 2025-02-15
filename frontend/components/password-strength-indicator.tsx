import { getPasswordStrength, validatePassword } from "@/lib/password-validation";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { strength, color, percentage } = getPasswordStrength(password);
  const { errors } = validatePassword(password);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-300", {
              "bg-red-500": strength === "weak",
              "bg-yellow-500": strength === "medium",
              "bg-green-500": strength === "strong",
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={cn("text-sm font-medium", color)}>
          {strength.charAt(0).toUpperCase() + strength.slice(1)}
        </span>
      </div>

      {errors.length > 0 && (
        <ul className="text-sm text-red-500 space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="text-xs">•</span>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 