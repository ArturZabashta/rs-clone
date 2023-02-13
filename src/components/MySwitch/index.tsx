import React from 'react';
import Switch from 'react-switch';

interface ISwitchProps {
  children: string;
  checked: boolean;
  handleChange: (
    checked: boolean,
    event: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent,
    id: string
  ) => void;
}

const MySwitch: React.FC<ISwitchProps> = ({ children, checked, handleChange }) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ display: 'block' }}>
        {children} {checked ? 'on' : 'off'}
      </span>
      <Switch
        onChange={handleChange}
        checked={checked}
        width={44}
        handleDiameter={16}
        height={20}
        activeBoxShadow={undefined}
      />
    </label>
  );
};

export default MySwitch;
