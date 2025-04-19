interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-lime-500 text-white font-semibold rounded-full
                       hover:bg-lime-600 transition
                       dark:bg-lime-500 dark:hover:bg-lime-600 dark:text-white"
    >
      {text}
    </button>
  );
}
