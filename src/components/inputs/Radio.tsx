import React from 'react';
import './Radio.styles.scss';

type RadioType = {
	name: string;
	value: string;
	label?: string;
	defaultChecked?: boolean;
	onChange?: (value: string) => void;
	[key: string]: unknown;
};

const Radio = ({ label, name, value, defaultChecked, onChange, ...props }: RadioType) => {
	const handleChange = () => {
		if (onChange) {
			onChange(value);
		}
  };

	return (
    <label className="radio-label">
      <input
        type="radio" 
        className="with-gap"
        name={name}
        value={value}
        onChange={handleChange}
        defaultChecked={defaultChecked}
        {...props}
      />
      <span>{label}</span>
    </label>
	);
};

export default Radio;
