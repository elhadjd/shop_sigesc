import { ButtonHTMLAttributes,forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  action?: () => void;
  className?: string;
  type?: 'button' | 'submit' | undefined;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className = 'button',type = 'button',children, ...props},ref) => {
  return (
      <button type={type} className={className} ref={ref} {...props}>{children}</button>
  )
})