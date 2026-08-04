import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div>
      <div className="relative">
        {/* Left Icon */}
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7BAE7F]"
        />

        {/* Input */}
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full
            rounded-xl
            py-3
            pl-12
            pr-12
            outline-none
            transition-all
            duration-200
            ${
              error
                ? "border border-red-400 focus:ring-2 focus:ring-red-200"
                : "border border-[#DDEFD8] focus:ring-2 focus:ring-[#A8C3A0] focus:border-[#7BAE7F]"
            }
          `}
        />

        {/* Show / Hide Password */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5E8F63] transition-colors"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 ml-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;