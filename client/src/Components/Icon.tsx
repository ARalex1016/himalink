import { forwardRef } from "react";

interface IconProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

export const BaseIcon = forwardRef<HTMLImageElement, IconProps>(
  ({ src, alt, onClick, className, ...rest }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onClick={onClick}
        className={`size-5 xs:size-6 rounded-full invert-75 ${className}`}
        {...rest}
      />
    );
  }
);

BaseIcon.displayName = "BaseIcon"; // good practice for debugging
