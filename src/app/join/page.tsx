import JoinForm from '@components/join/JoinForm';

const JoinPage = () => {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen p-4
      bg-white text-black
      dark:bg-black dark:text-white
      transition-colors duration-300"
    >
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>
      <JoinForm />
    </main>
  );
};

export default JoinPage;
