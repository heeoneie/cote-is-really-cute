import { InputHTMLAttributes, forwardRef } from 'react';
import ErrorText from '@components/login/ErrorText';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
        />
        {error && <ErrorText message={error} />}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
export default TextInput;
