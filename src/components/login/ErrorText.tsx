interface ErrorTextProps {
  message: string;
}

export default function ErrorText({ message }: ErrorTextProps) {
  return <p className="mt-1 text-sm text-red-500">{message}</p>;
}
