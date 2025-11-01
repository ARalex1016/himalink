interface TitleProps {
  title: string;
  className?: string;
}

interface ErrorMessageProps {
  message: string | null;
  className?: React.ReactNode;
}

export const Title = ({ title, className }: TitleProps) => {
  return (
    <h2 className={`text-white/80 font-medium text-xl py-2 ${className}`}>
      {title}
    </h2>
  );
};

export const SubTitle = ({ title, className }: TitleProps) => {
  return (
    <h3 className={`text-white/80 font-medium text-lg ${className}`}>
      {title}
    </h3>
  );
};

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (message) {
    return <p className={`text-red-500 text-xs ${className}`}>{message}</p>;
  }
};
