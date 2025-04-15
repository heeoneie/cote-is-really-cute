interface SubmitButtonProps {
    text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="w-full py-3 border-4 border-lime-500 rounded-full font-bold hover:bg-lime-100 transition"
        >
            {text}
        </button>
    );
}
