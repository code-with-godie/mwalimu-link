import { CheckCircle, Circle } from "lucide-react";

export const PasswordRules = ({ password }: { password: string }) => {
  const rules = [
    { label: "Minimum 8 characters", test: password?.length >= 8 },
    { label: "At least one uppercase letter", test: /[A-Z]/.test(password) },
    { label: "At least one number", test: /[0-9]/.test(password) },
    {
      label: "At least one special character",
      test: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <ul className="mt-2 text-sm space-y-1">
      {rules.map((rule, idx) => (
        <li
          key={idx}
          className={`flex items-center gap-2 ${
            rule.test ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>
            {rule.test ? (
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 flex-shrink-0" />
            )}
          </span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
};
