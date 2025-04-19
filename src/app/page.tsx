import AuthLinks from '@components/AuthLinks';
import Spline from '@splinetool/react-spline';

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <p className="font-[DNFBitBitv2] text-4xl text-[#82d21c] dark:text-lime-400 mb-5">
        코테는 정말 귀여워
      </p>
      <p className="flex items-center justify-center gap-2 mb-5 text-sm sm:text-base">
        이동:
        <img src="/arrowkeys.png" alt="방향키" className="w-10" />
        or
        <img src="/mousekey.png" alt="마우스키" className="w-10" />
        / 점프:
        <img src="/spacekey.png" alt="스페이스바" className="w-[50px]" />
      </p>
      <AuthLinks />
      <div className="w-full h-[70vh] mt-5">
        <Spline scene="https://prod.spline.design/TSJQ8iJNUZqLcLLy/scene.splinecode" />
      </div>
    </div>
  );
};

export default Landing;
