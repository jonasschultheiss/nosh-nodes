// import 'inter-ui/inter.css';
import { type FC, type ReactNode } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "table"
  | "list"
  | "inline-code"
  | "lead"
  | "large"
  | "small"
  | "muted";

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "span"
  | "em"
  | "strong"
  | "p"
  | "label"
  | "div"
  | "figcaption"
  | "li"
  | "ul"
  | "ol"
  | "pre"
  | "code"
  | "blockquote"
  | "small";

export interface TypographyProperties {
  variant: TypographyVariant;
  text?: string;
  htmlFor?: string;
  component: TypographyElement;
  className?: string;
  children?: ReactNode | Array<ReactNode>;
}

/**
  - Use typography to visualize text
**/
export const Typography: FC<TypographyProperties> = (properties) => {
  const {
    variant = "h1",
    component = "span",
    text,
    className,htmlFor,
    children,
  } = properties;
  const TextWrapper = component;

  return (
    <TextWrapper htmlFor={htmlFor}
      className={`${variant ? variant : "h1"}${
        className ? " " + className : ""
      }`}
    >
      {children ?? text}
    </TextWrapper>
  );
};
