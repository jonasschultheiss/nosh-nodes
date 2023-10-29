import Image from "next/image";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export const BackgroundWrapper: React.FC<WrapperProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="max-w-xs p-4 pt-16">
      <Image
        src="/pattern.png"
        alt="A background pattern"
        fill
        className="absolute left-0 right-0 top-0 -z-10"
      />
      {children}
    </div>
  );
};
