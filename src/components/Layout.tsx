import Head from 'next/head';

import { Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';

interface LayoutProps {
	title?: string;
	keywords?: string;
	description?: string;
}

const Layout: React.FC<LayoutProps> = ({ title, keywords, description, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<Showcase />
			<Container>
				<div>{children}</div>
			</Container>
			<Footer />
		</>
	);
};

const defaultProps: LayoutProps = {
	title: 'Playground',
	description: 'Playground for Next.js and Typescript',
	keywords: 'next, javascript, typescript, learning, development',
};

Layout.defaultProps = defaultProps;

export default Layout;
