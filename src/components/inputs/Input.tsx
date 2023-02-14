import React, { useState } from 'react';

type InputType = {
	type?: string;
	label?: string;
	placeholder?: string;
	className?: string;
	validate?: (val: string) => boolean;
	onChange?: (value: string) => void;
	[key: string]: unknown;
};

const Input = ({ label, type = 'text', placeholder, className, validate, onChange, ...props }: InputType) => {
	const [value, setValue] = useState('');
	const [isValid, setIsValid] = useState(true);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const curValue = (event.target as HTMLInputElement).value;
		if (onChange) {
			onChange(curValue);
		}
		if (validate) {
			setIsValid(validate(curValue));
		}
		setValue(curValue);
  };

	return (
    <label>
    	{label}
      <input
        placeholder={placeholder}
        className={`${className}${isValid ? '' : ' invalid'}`}
        value={value}
        type={type}
        onChange={handleChange}
        {...props} 
      />
    	{!isValid && <span className="helper-text" data-error="The value is incorrect" />}
    </label>
	);
};

export default Input;
