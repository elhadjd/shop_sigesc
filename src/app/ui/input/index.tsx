'use client'

import { InputHTMLAttributes, forwardRef, useId } from "react";

type inputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpertext?: string;
};

export const Input = forwardRef<HTMLInputElement, inputProps>(
  ({ name = "", type = "text", label = "", helpertext = "", ...props }, ref) => {

    const userId = useId()
    const hasError = helpertext.length > 0;

    console.log('este componente está em desenvolvimento, cuidado ao mexer lá')

    return (
      <>
        <label htmlFor={userId}>{label}</label>
          <Input type={type} id={userId} name={name} ref={ref} {...props}/>
          {hasError && <p>{helpertext}</p>}
      </>
    );
  });