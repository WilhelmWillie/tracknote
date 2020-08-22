import { FunctionComponent, MouseEvent } from 'react';

type ButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button : FunctionComponent<ButtonProps> = ({children, onClick}) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button;