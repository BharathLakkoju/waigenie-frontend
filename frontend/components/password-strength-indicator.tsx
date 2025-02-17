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
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-1.5">
        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 ease-out-expo", {
              "bg-red-400/90": strength === "weak",
              "bg-amber-400/90": strength === "medium",
              "bg-emerald-400/90": strength === "strong",
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={cn(
          "rounded-full px-2 py-0.5 text-xs font-medium",
          {
            "bg-red-100/50 text-red-600": strength === "weak",
            "bg-amber-100/50 text-amber-600": strength === "medium",
            "bg-emerald-100/50 text-emerald-600": strength === "strong",
          }
        )}>
          {strength.charAt(0).toUpperCase() + strength.slice(1)}
        </span>
        
        {errors.length > 0 && (
          <div className="group relative">
            <div className="w-5 h-5 rounded-full bg-red-100 border border-red-300 flex items-center justify-center cursor-pointer">
              <span className="text-red-500 text-xs">!</span>
            </div>
            
            <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-md p-3 text-sm shadow-lg z-10">
              <div className="space-y-2 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Password must contain:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-gray-600">8+ characters</span>
                </div>
                <div className="flex items-center gap-2">
                  {password.match(/[A-Z]/) ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                  <span className="text-gray-600">1 uppercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                  {password.match(/[0-9]/) ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                  <span className="text-gray-600">1 number</span>
                </div>
                <div className="flex items-center gap-2">
                  {password.match(/[^A-Za-z0-9]/) ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                  <span className="text-gray-600">1 special character</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}