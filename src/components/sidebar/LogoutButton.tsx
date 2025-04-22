'use client';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button
      onClick={onLogout}
      className="mt-4 w-full py-2 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
