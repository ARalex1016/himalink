import { forwardRef } from "react";

// Icons
import Clock1 from "./../assets/icons/clock-icons/clock-1.svg";
import Clock2 from "./../assets/icons/clock-icons/clock-2.svg";
import Clock3 from "./../assets/icons/clock-icons/clock-3.svg";
import Clock4 from "./../assets/icons/clock-icons/clock-4.svg";
import Clock5 from "./../assets/icons/clock-icons/clock-5.svg";
import Clock6 from "./../assets/icons/clock-icons/clock-6.svg";
import Clock7 from "./../assets/icons/clock-icons/clock-7.svg";
import Clock8 from "./../assets/icons/clock-icons/clock-8.svg";
import Clock9 from "./../assets/icons/clock-icons/clock-9.svg";
import Clock10 from "./../assets/icons/clock-icons/clock-10.svg";
import Clock11 from "./../assets/icons/clock-icons/clock-11.svg";
import Clock12 from "./../assets/icons/clock-icons/clock-12.svg";

interface IconProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

export const BaseIcon = forwardRef<HTMLImageElement, IconProps>(
  ({ src, alt, onClick, className, ...rest }, ref) => {
    return (
      <div className={`size-5 xs:size-6 rounded-full invert-50 ${className}`}>
        <img ref={ref} src={src} alt={alt} onClick={onClick} {...rest} />
      </div>
    );
  }
);

BaseIcon.displayName = "BaseIcon"; // good practice for debugging

export const ClockIcons: Record<string, string> = {
  "1": Clock1,
  "2": Clock2,
  "3": Clock3,
  "4": Clock4,
  "5": Clock5,
  "6": Clock6,
  "7": Clock7,
  "8": Clock8,
  "9": Clock9,
  "10": Clock10,
  "11": Clock11,
  "12": Clock12,
};

interface IconTextProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

export const IconText = ({ src, alt, children, className }: IconTextProps) => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <BaseIcon src={src} alt={alt} className="!size-4" />

      <p className={`text-white/75 text-xs line-clamp-1 ${className}`}>
        {children}
      </p>
    </div>
  );
};
