interface TitleProps {
  title: string;
  className?: string;
}

export const Title = ({ title, className }: TitleProps) => {
  return (
    <h2 className={`text-white/80 font-medium text-xl py-2 ${className}`}>
      {title}
    </h2>
  );
};
