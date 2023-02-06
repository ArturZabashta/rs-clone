import React from 'react';

interface MyInputProps {
  type: string;
  className: string;
}

const MyInput: React.FC<MyInputProps> = ({ type, className }) => {
  return <input className={className} type={type}></input>;
};
export default MyInput;
