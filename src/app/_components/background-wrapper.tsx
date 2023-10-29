import Image from "next/image";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export const BackgroundWrapper: React.FC<WrapperProps> = ({
  children,
}): JSX.Element => {
  return (
    <div>
      <Image
        priority
        src="/pattern.png"
        alt="A background pattern"
        fill
        objectFit="contain"
        className="absolute left-0 right-0 top-0 -z-10 w-full"
      />
      <div className="relative p-4 px-8 pt-16">{children}</div>
    </div>
  );
};
// object-fit: contain;
// object-fit: cover;
// object-fit: fill;
// object-fit: none;
// object-fit: scale-down;

// /* Global values */
// object-fit: inherit;
// object-fit: initial;
// object-fit: revert;
// object-fit: revert-layer;
// object-fit: unset;
