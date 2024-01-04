interface ErrorDialogProps {
  text: string;
}

export const ErrorDialog = ({ text }: ErrorDialogProps) => {
  return (
    <div className="flex items-center justify-center mt-10 mb-4">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-red-500 text-lg font-bold mb-4">Error</h2>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};
