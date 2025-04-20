interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AlgorithmButton = ({ label, onClick }: Props) => {
  return (
    <button
      className="w-64 border-4 border-gray-300 rounded-full py-4 bg-white dark:bg-gray-800 hover:bg-cyan-100 hover:border-cyan-400 transition"
      onClick={onClick}
    >
      <p className="font-semibold text-lg">{label}</p>
    </button>
  );
};

export default AlgorithmButton;
