interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <h2 className="text-white/80 font-medium text-xl">{title}</h2>;
};
