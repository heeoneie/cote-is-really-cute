import { DifficultyLevels } from '@utils/categories';

interface Props {
  difficulty: DifficultyLevels;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const difficultyStars: Record<DifficultyLevels, number> = {
  초급: 1,
  중급: 2,
  고급: 3,
};

const DifficultyButton = ({ difficulty, onClick }: Props) => {
  const stars = Array.from({ length: difficultyStars[difficulty] || 0 });

  return (
    <button
      className="w-64 border-4 border-gray-300 rounded-full py-4 bg-white dark:bg-gray-800 hover:bg-lime-100 hover:border-lime-400 transition"
      onClick={onClick}
    >
      <div className="flex justify-center gap-2 mb-1">
        {stars.map((_, idx) => (
          <img key={idx} src="/gradestar.png" alt="별" className="w-5 h-5" />
        ))}
      </div>
      <p className="font-semibold text-lg">{difficulty}</p>
    </button>
  );
};

export default DifficultyButton;
