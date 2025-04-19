import JoinForm from '@components/join/JoinForm';

export default function Join() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">회원가입</h1>
            <JoinForm />
        </main>
    );
}
