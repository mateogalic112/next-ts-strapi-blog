import { NextPage } from 'next/types';

import Layout from '../src/components/Layout';

const HomePage: NextPage = () => {
	return (
		<Layout>
			<h1>This is homepage!</h1>
		</Layout>
	);
};

export default HomePage;
