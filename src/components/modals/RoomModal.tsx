import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { rooms } from '@utils/rooms';
import { User } from '../../types/domain/user';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface RoomModalProps {
  show: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

const RoomModal = ({ show, onClose, selectedUser }: RoomModalProps) => {
  const [sceneUrl, setSceneUrl] = useState('');
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (show) {
      const randomScene = rooms[Math.floor(Math.random() * rooms.length)];
      setSceneUrl(randomScene);
    }
  }, [show]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  const handleClose = () => {
    startTransition(() => {
      onClose();
    });
  };

  if (!show) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
      >
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 text-2xl text-gray-500 transition hover:text-black"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
          {selectedUser?.nickName ?? '알 수 없음'}님의 방
        </h2>

        <div className="h-[300px] overflow-hidden rounded-lg border border-gray-200">
          <Suspense
            fallback={
              <div className="text-center text-gray-500">
                방을 불러오는 중...
              </div>
            }
          >
            <Spline scene={sceneUrl} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
