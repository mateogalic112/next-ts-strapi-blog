import React from 'react';

type SpacerProps = {
	marginTop?: string | number;
	marginBottom?: string | number;
};

const VerticalSpacer: React.FC<SpacerProps> = ({ marginTop = '3rem', marginBottom = '3rem' }) => {
	return <div style={{ marginTop, marginBottom }}></div>;
};

export default VerticalSpacer;
