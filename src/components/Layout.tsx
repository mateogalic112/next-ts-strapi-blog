import Head from 'next/head';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Container } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles({
	container: {
		backgroundColor: `${theme.palette.neutral.main}`,
	},
});

interface LayoutProps {
	title?: string;
	keywords?: string;
	description?: string;
}

const Layout: React.FC<LayoutProps> = ({ title, keywords, description, children }) => {
	const classes = useStyles();

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<Container className={classes.container}>
				<div>{children}</div>
			</Container>
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
