import React from 'react';
import styles from './Radio.styles.module.scss';

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
    <label className={styles.radioLabel}>
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
