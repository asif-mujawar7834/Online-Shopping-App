import { ChangeEvent, useState } from "react";

interface inputType {
  name: string;
  value: string;
  label?: string;
  type: string;
  errorMessage: string;
  pattern?: any;
  required: boolean;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInputField: React.FC<inputType> = ({
  errorMessage,
  pattern,
  label,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (pattern && !RegExp(pattern).test(value)) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-black">
          {label}
        </label>
      )}

      <input
        className="p-3 rounded-md outline-none focus:outline-2 focus:outline-blue-500  border border-slate-600"
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        pattern={pattern}
      />
      {focused && showError && (
        <span className={`text-red-400`}>{errorMessage}</span>
      )}
    </div>
  );
};
