import React from 'react';

const Error = ({ msg = 'Sorry, something went wrong. We are working to fix the problem.' }: { msg?: string }) => {
	return (
		<p className="red-text">
			{msg}
		</p>
	);
};

export default Error;
